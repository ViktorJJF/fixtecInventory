const model = require("../models/Purchases.js");
const PurchasesDetail = require("../models/PurchasesDetails.js");
const utils = require("../helpers/utils");
const db = require("../helpers/db");

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
          from: "purchasesdetails",
          localField: "_id",
          foreignField: "purchaseId",
          as: "productsByPurchase",
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
          products: "$productsByPurchase",
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
    //create purchase
    req.body.userId = req.user._id;
    //populate with purchased products
    let products = req.body.products;
    if (products.length === 0)
      throw utils.buildErrObject(422, "No agregaste productos a la compra");
    //adding new purchase id to products
    let createdPurchase = await db.createItem(req.body, model);
    for (const product of products) {
      product.purchaseId = createdPurchase.payload._id;
    }
    //creating purchases details rows
    let purchasedProducts = await Promise.all(
      products.map((product) => db.createItem(product, PurchasesDetail))
    );
    purchasedProducts = purchasedProducts.map(
      (purchasedProduct) => purchasedProduct.payload
    );
    //return purchase id with products
    res.status(200).json({
      ok: true,
      payload: {
        products: purchasedProducts,
        ...createdPurchase.payload.toObject(),
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
