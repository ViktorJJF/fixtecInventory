const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let typeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del tipo es requerido"],
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

module.exports = mongoose.model("Types", typeSchema);
