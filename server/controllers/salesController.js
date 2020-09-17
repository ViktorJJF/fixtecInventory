const model = require("../models/Sales.js");
const SalesDetail = require("../models/SalesDetails.js");
const Product = require("../models/Products.js");
const utils = require("../helpers/utils");
const db = require("../helpers/db");
const { ObjectId } = require("mongodb");
const { updateStock } = require("../mongoMiddlewares/Middlewares");

//Public functions
const stockAvailable = async (productId, qty) => {
  try {
    let product = await Product.findOne({ _id: productId });
    return product.stock >= qty;
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
  try {
    // let filterProducts = {};
    // let limit = parseInt(req.query.limit) || 20;
    // let filter = {};
    // let options = {};
    // let page = req.query.page || 1;
    //filter product
    // if (req.query.product) {
    //   filter["products.productId"] = ObjectId(req.query.product);
    // }
    //filter commerce
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
    //options
    // options["limit"] = limit;
    // options["skip"] = (parseInt(page) - 1) * parseInt(limit) || 0;
    //aggregate
    // let aggregated = await SalesDetail.aggregate([
    //   {
    //     $match: {
    //       productId: ObjectId("5f2fd39924e1951cf08b806c"),
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$saleId",
    //     },
    //   },
    //   // {
    //   //   $unwind: "$saleId",
    //   // },
    //   // {
    //   //   $project: {
    //   //     saleId: "$_id",
    //   //   },
    //   // },
    //   {
    //     $lookup: {
    //       from: "sales",
    //       localField: "_id",
    //       foreignField: "_id",
    //       as: "sale",
    //     },
    //   },
    //   { $unwind: "$sale" },
    //   //set filtes by date or commerce
    //   {
    //     $lookup: {
    //       from: "salesdetails",
    //       localField: "_id",
    //       foreignField: "saleId",
    //       as: "products",
    //     },
    //   },
    //   // {
    //   //   $project: {
    //   //     _id: "$sale._id",
    //   //     date: "$sale.date",
    //   //     userId: "$sale.userId",
    //   //     commerce: "$sale.commerce",
    //   //     products: "$products",
    //   //     total: 0,
    //   //   },
    //   // },
    //   // },
    //   // { $out: "dimen_saleId" },
    //   // { $match: filter },
    //   // // { $skip: options.skip },
    //   // {
    //   //   $facet: {
    //   //     info: [
    //   //       {
    //   //         $count: "totalDocs",
    //   //       },
    //   //       {
    //   //         $project: {
    //   //           _id: "1",
    //   //           totalDocs: "$totalDocs",
    //   //           totalPages: {
    //   //             $ceil: { $divide: ["$totalDocs", limit] },
    //   //           },
    //   //           page: { $toInt: page },
    //   //         },
    //   //       },
    //   //     ],
    //   //     result: [
    //   //       { $limit: options.limit },
    //   //       // {
    //   //       //   $lookup: {
    //   //       //     from: "salesdetails",
    //   //       //     localField: "_id",
    //   //       //     foreignField: "saleId",
    //   //       //     as: "products",
    //   //       //   },
    //   //       // },
    //   //       {
    //   //         $lookup: {
    //   //           from: "salesdetails",
    //   //           let: { saleId: "$_id" },
    //   //           pipeline: [
    //   //             {
    //   //               $match: {
    //   //                 $expr: {
    //   //                   $and: [
    //   //                     { $eq: ["$saleId", "$$saleId"] },
    //   //                     { $eq: ["$productId", ObjectId(req.query.product)] },
    //   //                   ],
    //   //                 },
    //   //               },
    //   //             },
    //   //             { $project: { saleId: "$saleId" } },
    //   //           ],
    //   //           as: "filteredSales",
    //   //         },
    //   //       },
    //   //       { $unwind: "$userId" }, //array to object (like populate)
    //   //       // {
    //   //       //   $match: {
    //   //       //     "products.productId": ObjectId(req.query.product),
    //   //       //   },
    //   //       // },
    //   //     ],
    //   //   },
    //   // },
    //   // { $unwind: "$info" },
    //   // {$match:}
    //   // {
    //   //   $project: {
    //   //     totalDocs: "$info.totalDocs",
    //   //     payload: "$result.filteredSales",
    //   //     totalPages: "$info.totalPages",
    //   //     page: "$info.page",
    //   //   },
    //   // },
    // ]);
    // res.status(200).json({ ok: true, aggregated });
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
    // res.status(200).json({ ok: true, ...aggregated[0] });
    // res.status(200).json(await db.getAggregatedItems(req, model, aggregated));
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
    //begin transaction
    let createdSale, soldProducts;
    const session = await model.startSession();
    try {
      await session.withTransaction(async () => {
        //create sale
        createdSale = await db.createItem(req.body, model, session);
        //adding new sale id to products
        for (const product of products) {
          product.saleId = createdSale.payload._id;
        }
        //creating sales details rows
        soldProducts = await Promise.all(
          products.map((product) =>
            db.createItem(product, SalesDetail, session)
          )
        );
        soldProducts = soldProducts.map((soldProduct) => soldProduct.payload);
        for (const product of soldProducts) {
          await updateStock(product.productId, -product.qty, session);
        }
      });
    } catch (error) {
      throw utils.buildErrObject(
        422,
        "Algo salió mal... intenta agregar tu venta de nuevo"
      );
    } finally {
      session.endSession();
    }
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
    //begin transaction
    let deletedItemPayload;
    const session = await model.startSession();
    try {
      await session.withTransaction(async () => {
        //delete sale
        deletedItemPayload = await db.deleteItem(id, model, session);
        //delete sale details
        let salesDetails = await SalesDetail.find({ saleId: id });
        for (const salesDetail of salesDetails) {
          await db.deleteItem(salesDetail._id, SalesDetail, session);
          //update stock
          await updateStock(salesDetail.productId, salesDetail.qty, session);
        }
      });
    } catch (error) {
      console.log(error);
      throw utils.buildErrObject(
        422,
        "Algo salió mal... intenta eliminar tu venta de nuevo"
      );
    } finally {
      session.endSession();
    }
    res.status(200).json(deletedItemPayload);
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
