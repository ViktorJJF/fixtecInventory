const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let toolSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre de la inversión es requerido"],
    },
    toolsTypeId: {
      type: Schema.Types.ObjectId,
      ref: "ToolsTypes",
    },
    stock: { type: Number, default: 0 },
    purchasePrice: {
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
    date: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//auto populate
var autoPopulateLead = function (next) {
  this.populate("toolsTypeId");
  next();
};
var autoPopulateLead2 = function (doc, next) {
  doc
    .populate("toolsTypeId")
    .execPopulate()
    .then(function () {
      next();
    });
};

toolSchema.pre("findOne", autoPopulateLead).pre("find", autoPopulateLead);
toolSchema.post("save", autoPopulateLead2);

module.exports = mongoose.model("Tools", toolSchema);
