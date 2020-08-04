const mongoose = require("mongoose");
const PurchasesDetail = require("../models/PurchasesDetails.js");

let Schema = mongoose.Schema;

let purchaseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
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
