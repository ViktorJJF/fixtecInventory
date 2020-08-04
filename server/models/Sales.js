const mongoose = require("mongoose");
const SalesDetail = require("../models/SalesDetails.js");

let Schema = mongoose.Schema;

let saleSchema = new Schema(
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

const deleteSalesDetailsProducts = async function (next) {
  try {
    let salesDetails = await SalesDetail.find({ saleId: this._id });
    for (const salesDetail of salesDetails) {
      await salesDetail.remove();
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

//hooks
saleSchema.pre("remove", deleteSalesDetailsProducts);

module.exports = mongoose.model("Sales", saleSchema);
