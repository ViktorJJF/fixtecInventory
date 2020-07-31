const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre de la marca es requerido"],
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
    timestamps: true,
  }
);

module.exports = mongoose.model("Brands", brandSchema);
