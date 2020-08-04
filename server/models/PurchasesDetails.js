const mongoose = require("mongoose");
let middlewares = require("../mongoMiddlewares/Middlewares");

let Schema = mongoose.Schema;

let purchaseDetailSchema = new Schema(
  {
    purchaseId: {
      type: Schema.Types.ObjectId,
      ref: "Sales",
      required: [true, "El id de la compra es requerido"],
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: [true, "El id del producto es requerido"],
    },
    purchasePrice: { type: Number, default: 0 },
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
  let createdPurchaseDetail = doc;
  try {
    if (!createdPurchaseDetail.history) {
      await middlewares.updateStock(
        createdPurchaseDetail.productId,
        -createdPurchaseDetail.qty
      );
    }
  } catch (error) {
    console.log(error);
  }
  next();
};
//increase stock function
const increaseStockHook = async (doc, next) => {
  let createdPurchaseDetail = doc;
  try {
    if (!createdPurchaseDetail.history) {
      await middlewares.updateStock(
        createdPurchaseDetail.productId,
        createdPurchaseDetail.qty
      );
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

purchaseDetailSchema.post("save", increaseStockHook); // substract stock
purchaseDetailSchema.post("remove", substractStockHook); // increase stock

module.exports = mongoose.model("PurchasesDetails", purchaseDetailSchema);
