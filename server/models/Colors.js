const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let colorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El color es requerido"],
    },
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

module.exports = mongoose.model("Colors", colorSchema);
