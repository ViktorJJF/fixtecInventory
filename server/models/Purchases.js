const mongoose = require("mongoose");
const PurchasesDetail = require("../models/PurchasesDetails.js");

let Schema = mongoose.Schema;

let purchaseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    commerce: {
      type: String,
      required: [true, "El tipo negocio es requerido"],
      default: "OTROS",
      enum: {
        values: [
          "CELULARES",
          "VENTA DE ACCESORIOS",
          "VENTA DE REPUESTOS",
          "SOFTWARE",
          "HARDWARE",
          "OTROS",
        ],
        message: "{VALUE} no es un rol válido",
      },
    },
    status: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const deletePurchasesDetailsProducts = async function (next) {
  try {
    let purchasesDetails = await PurchasesDetail.find({ purchaseId: this._id });
    for (const purchasesDetail of purchasesDetails) {
      await purchasesDetail.remove();
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

//hooks
purchaseSchema.pre("remove", deletePurchasesDetailsProducts);

module.exports = mongoose.model("Purchases", purchaseSchema);
