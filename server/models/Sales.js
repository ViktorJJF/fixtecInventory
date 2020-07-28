const mongoose = require("mongoose");
const SalesDetail = require("../models/SalesDetails.js");
const Product = require("../models/Products.js");

const middlewares = require("../mongoMiddlewares/Middlewares");

let Schema = mongoose.Schema;

let orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.post("findOneAndUpdate", async function () {
  // deleting on cascade and updating stock
  let orderId = this._conditions._id;
  SalesDetail.find(
    {
      orderId,
    },
    (err, SalesDetails) => {
      SalesDetails.forEach((detail) => {
        Product.findOne(
          {
            _id: detail.productId,
          },
          async (err, product) => {
            if (err) {
              return console.log(err);
            }
            await middlewares.updateStock(product._id, detail.qty);
          }
        );
      });
    }
  );
  SalesDetail.updateMany(
    {
      orderId: orderId,
    },
    {
      $set: {
        status: false,
      },
    },
    function (err, deletedCount) {
      if (err) {
        return console.log(err);
      }
    }
  );
});

module.exports = mongoose.model("Orders", orderSchema);
