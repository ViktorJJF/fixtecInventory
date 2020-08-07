const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del producto es requerido"],
    },
    typeId: {
      type: Schema.Types.ObjectId,
      ref: "Types",
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "Brands",
    },
    colorId: {
      type: Schema.Types.ObjectId,
      ref: "Colors",
    },
    qualityId: {
      type: Schema.Types.ObjectId,
      ref: "Qualities",
    },
    gender: {
      type: String,
    },
    stock: Number,
    minStock: {
      type: Number,
      default: 5,
    },
    purchasePrice: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    description: String,
    status: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//auto populate
var autoPopulateLead = function (next) {
  console.log("se paso por products gaea");
  this.populate("typeId");
  this.populate("brandId");
  this.populate("colorId");
  this.populate("qualityId");
  next();
};
var autoPopulateLead2 = function (doc, next) {
  doc
    .populate("typeId")
    .populate("brandId")
    .populate("colorId")
    .populate("qualityId")
    .execPopulate()
    .then(function () {
      next();
    });
};

productSchema.pre("findOne", autoPopulateLead).pre("find", autoPopulateLead);
productSchema.post("save", autoPopulateLead2);

module.exports = mongoose.model("Products", productSchema);
