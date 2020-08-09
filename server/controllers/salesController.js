const model = require("../models/Sales.js");
const SalesDetail = require("../models/SalesDetails.js");
const Product = require("../models/Products.js");
const utils = require("../helpers/utils");
const db = require("../helpers/db");
const { ObjectId } = require("mongodb");

//Public functions
const stockAvailable = async (productId, qty) => {
  try {
    let product = await Product.findOne({ _id: productId });
    return product.stock > qty;
  } catch (error) {
    throw error;
  }
};

//methods

const listAll = async (req, res) => {
  try {
    res.status(200).json(await db.getAllItems(model));
  } catch (error) {
    utils.handleError(res, error);
  }
};

const list = async (req, res) => {
  try {
    const query = req.query;
    // const query = await db.checkQueryString(req.query);
    res.status(200).json(await db.getItems(req, model, query));
  } catch (error) {
    utils.handleError(res, error);
  }
};
const listWithProducts = async (req, res) => {
  // try {
  //   // let filterProducts = {};
  //   let limit = parseInt(req.query.limit) || 20;
  //   let filter = {};
  //   let options = {};
  //   let page = req.query.page || 1;
  //   //filter product
  //   // if (req.query.product) {
  //   //   filter["products.productId"] = ObjectId(req.query.product);
  //   // }
  //   //filter commerce
  //   if (req.query.commerce) {
  //     filter["commerce"] = req.query.commerce;
  //   }
  //   //filter date range
  //   if (req.query.startDate || req.query.endDate) {
  //     filter["date"] = {};
  //     if (req.query.startDate)
  //       filter.date["$gte"] = utils.convertToDate(req.query.startDate);
  //     if (req.query.endDate)
  //       filter.date["$lte"] = utils.convertToDate(req.query.endDate);
  //   }
  //   console.log("este es el filtro: ", filter);
  //   //options
  //   options["limit"] = limit;
  //   options["skip"] = (parseInt(page) - 1) * parseInt(limit) || 0;
  //   //aggregate
  //   let aggregated = await model.aggregate([
  //     { $match: filter },
  //     { $skip: options.skip },
  //     {
  //       $facet: {
  //         info: [
  //           {
  //             $count: "totalDocs",
  //           },
  //           {
  //             $project: {
  //               _id: "1",
  //               totalDocs: "$totalDocs",
  //               totalPages: {
  //                 $ceil: { $divide: ["$totalDocs", limit] },
  //               },
  //               page: { $toInt: page },
  //             },
  //           },
  //         ],
  //         result: [
  //           { $limit: options.limit },
  //           {
  //             $lookup: {
  //               from: "salesdetails",
  //               localField: "_id",
  //               foreignField: "saleId",
  //               as: "products",
  //             },
  //           },
  //           {
  //             $lookup: {
  //               from: "users",
  //               localField: "userId",
  //               foreignField: "_id",
  //               as: "userId",
  //             },
  //           },
  //           { $unwind: "$userId" }, //array to object (like populate)
  //           {
  //             $match: {
  //               "products.productId": ObjectId(req.query.product),
  //             },
  //           },
  //         ],
  //       },
  //     },
  //     { $unwind: "$info" },
  //     {
  //       $project: {
  //         totalDocs: "$info.totalDocs",
  //         payload: "$result",
  //         totalPages: "$info.totalPages",
  //         page: "$info.page",
  //       },
  //     },
  //   ]);
  //   res.status(200).json({ ok: true, ...aggregated[0] });
  //   // res.status(200).json(await db.getAggregatedItems(req, model, aggregated));
  // } catch (error) {
  //   console.log("el error: ", error);
  //   utils.handleError(res, error);
  // }

  try {
    let filterProducts = {};
    let filterDate = {};
    //filter product
    if (req.query.product) {
      filterProducts["products.productId"] = ObjectId(req.query.product);
    }
    //filter commerce
    if (req.query.commerce) {
      filterProducts["commerce"] = req.query.commerce;
    }
    //filter date range
    if (req.query.startDate || req.query.endDate) {
      filterDate["date"] = {};
      if (req.query.startDate)
        filterDate.date["$gte"] = utils.convertToDate(req.query.startDate);
      if (req.query.endDate)
        filterDate.date["$lte"] = utils.convertToDate(req.query.endDate);
    }
    //aggregate
    let aggregated = model.aggregate([
      {
        $match: filterDate,
      },
      {
        $lookup: {
          from: "salesdetails",
          localField: "_id",
          foreignField: "saleId",
          as: "productsBySale",
        },
      },
      // { $unwind: "$products" },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "users",
        },
      },
      { $unwind: "$users" }, //array to object (like populate)
      {
        $project: {
          _id: 1,
          date: "$date",
          userId: "$users",
          createdAt: "$createdAt",
          products: "$productsBySale",
          commerce: "$commerce",
        },
      },
      {
        $match: filterProducts,
      },
    ]);

    res.status(200).json(await db.getAggregatedItems(req, model, aggregated));
  } catch (error) {
    console.log("el error: ", error);
    utils.handleError(res, error);
  }
};

const listOne = async (req, res) => {
  try {
    const id = await utils.isIDGood(req.params.id);
    res.status(200).json(await db.getItem(id, model));
  } catch (error) {
    utils.handleError(res, error);
  }
};

const create = async (req, res) => {
  try {
    req.body.userId = req.user._id;
    //populate with sold products
    let products = req.body.products;
    //validations
    if (products.length === 0)
      throw utils.buildErrObject(422, "No agregaste productos a la venta");
    for (const product of products) {
      if (
        !(await stockAvailable(product.productId, product.qty)) &&
        !product.history
      )
        throw utils.buildErrObject(422, "No cuentas con stock suficiente...");
    }
    //adding new sale id to products
    //create sale
    let createdSale = await db.createItem(req.body, model);
    for (const product of products) {
      product.saleId = createdSale.payload._id;
    }
    //creating sales details rows
    let soldProducts = await Promise.all(
      products.map((product) => db.createItem(product, SalesDetail))
    );
    soldProducts = soldProducts.map((soldProduct) => soldProduct.payload);
    //return sale id with products
    res.status(200).json({
      ok: true,
      payload: {
        products: soldProducts,
        ...createdSale.payload.toObject(),
      },
    });
  } catch (error) {
    utils.handleError(res, error);
  }
};
const update = async (req, res) => {
  try {
    req.body.userId = req.user._id;
    const id = await utils.isIDGood(req.params.id);
    res.status(200).json(await db.updateItem(id, model, req.body));
  } catch (error) {
    utils.handleError(res, error);
  }
};
const deletes = async (req, res) => {
  try {
    const id = await utils.isIDGood(req.params.id);
    res.status(200).json(await db.deleteItem(id, model));
  } catch (error) {
    utils.handleError(res, error);
  }
};

module.exports = {
  list,
  listAll,
  listOne,
  listWithProducts,
  create,
  update,
  deletes,
};
