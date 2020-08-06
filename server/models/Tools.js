const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let productSchema = new Schema(
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//auto populate
var autoPopulateLead = function (next) {
  console.log("se paso por products gaea");
  this.populate("toolsTypeId");
  next();
};

productSchema.pre("findOne", autoPopulateLead).pre("find", autoPopulateLead);

module.exports = mongoose.model("Tools", productSchema);
