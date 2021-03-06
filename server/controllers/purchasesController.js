const model = require("../models/Purchases.js");
const PurchasesDetail = require("../models/PurchasesDetails.js");
const { ObjectId } = require("mongodb");
const utils = require("../helpers/utils");
const db = require("../helpers/db");
const { updateStock } = require("../mongoMiddlewares/Middlewares");

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
    //begin transaction
    let createdPurchase, purchasedProducts;
    const session = await model.startSession();
    try {
      await session.withTransaction(async () => {
        //create purchase
        createdPurchase = await db.createItem(req.body, model, session);
        //adding new purchase id to products
        for (const product of products) {
          product.purchaseId = createdPurchase.payload._id;
        }
        //creating purchases details rows
        purchasedProducts = await Promise.all(
          products.map((product) =>
            db.createItem(product, PurchasesDetail, session)
          )
        );
        purchasedProducts = purchasedProducts.map(
          (soldProduct) => soldProduct.payload
        );
        for (const product of purchasedProducts) {
          await updateStock(product.productId, product.qty, session);
        }
      });
    } catch (error) {
      console.log(error);
      throw utils.buildErrObject(
        422,
        "Algo salió mal... intenta agregar tu compra de nuevo"
      );
    } finally {
      session.endSession();
    }
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
    //begin transaction
    let deletedItemPayload;
    const session = await model.startSession();
    try {
      await session.withTransaction(async () => {
        //delete purchase
        deletedItemPayload = await db.deleteItem(id, model, session);
        //delete purchase details
        let purchasesDetails = await PurchasesDetail.find({ purchaseId: id });
        for (const purchasesDetail of purchasesDetails) {
          await db.deleteItem(purchasesDetail._id, PurchasesDetail, session);
          //update stock
          await updateStock(
            purchasesDetail.productId,
            -purchasesDetail.qty,
            session
          );
        }
      });
    } catch (error) {
      console.log(error);
      throw utils.buildErrObject(
        422,
        "Algo salió mal... intenta eliminar tu compra de nuevo"
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
