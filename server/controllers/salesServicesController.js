const model = require("../models/SalesServices.js");
const utils = require("../helpers/utils");
const db = require("../helpers/db");
const { ObjectId } = require("mongodb");
const { updateStock } = require("../mongoMiddlewares/Middlewares");

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
    if (query.startDate || query.endDate) {
      query.date = {};
      if (query.startDate)
        query.date["$gte"] = utils.convertToDate(query.startDate);
      if (query.endDate)
        query.date["$lte"] = utils.convertToDate(query.endDate);
      delete query["startDate"];
      delete query["endDate"];
    }
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
    let services = req.body.services;
    //validations
    if (services.length === 0)
      throw utils.buildErrObject(422, "No agregaste servicios");
    //begin transaction and update stock
    let createdSaleService;
    const session = await model.startSession();
    try {
      await session.withTransaction(async () => {
        createdSaleService = await db.createItem(req.body, model, session);
        for (const service of createdSaleService.payload.services) {
          for (const product of service.cost.products) {
            await updateStock(product, -1, session);
          }
        }
      });
    } catch (error) {
      throw utils.buildErrObject(
        422,
        "Algo salió mal... intenta agregar tu venta de servicio de nuevo"
      );
    } finally {
      session.endSession();
    }
    //end transaction
    res.status(200).json(createdSaleService);
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

    let salesServiceToDelete;
    const session = await model.startSession();
    try {
      await session.withTransaction(async () => {
        //search sale service to delete
        salesServiceToDelete = await db.getItem(id, model);
        //update stock (if hast cost products)
        for (const service of salesServiceToDelete.payload.services) {
          if (service.cost.products.length > 0) {
            for (const product of service.cost.products) {
              await updateStock(product, 1, session);
            }
          }
        }
        //delete sale service
        await db.deleteItem(id, model, session);
      });
    } catch (error) {
      throw utils.buildErrObject(
        422,
        "Algo salió mal... intenta eliminar tu venta de servicio de nuevo"
      );
    } finally {
      session.endSession();
    }
    res.status(200).json(salesServiceToDelete);
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
