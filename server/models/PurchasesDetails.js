const mongoose = require("mongoose");

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

module.exports = mongoose.model("PurchasesDetails", purchaseDetailSchema);
