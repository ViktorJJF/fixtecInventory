const mongoose = require("mongoose");
let middlewares = require("../mongoMiddlewares/Middlewares");

let Schema = mongoose.Schema;

let salesDetailSchema = new Schema(
  {
    saleId: {
      type: Schema.Types.ObjectId,
      ref: "Sales",
      required: [true, "El id de la venta es requerido"],
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: [true, "El id del producto es requerido"],
    },
    salePrice: { type: Number, default: 0 },
    qty: { type: Number, default: 0 },
    history: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
  }
);

//substract stock function
const substractStockHook = async (doc, next) => {
  let createdSaleDetail = doc;
  try {
    if (!createdSaleDetail.history) {
      await middlewares.updateStock(
        createdSaleDetail.productId,
        -createdSaleDetail.qty
      );
    }
  } catch (error) {
    console.log(error);
  }
  next();
};
//increase stock function
const increaseStockHook = async (doc, next) => {
  let createdSaleDetail = doc;
  try {
    if (!createdSaleDetail.history) {
      await middlewares.updateStock(
        createdSaleDetail.productId,
        createdSaleDetail.qty
      );
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

salesDetailSchema.post("save", substractStockHook); // substract stock
salesDetailSchema.post("remove", increaseStockHook); // increase stock

module.exports = mongoose.model("SalesDetails", salesDetailSchema);
