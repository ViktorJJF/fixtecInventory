const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let saleSchema = new Schema(
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
    history: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("Sales", saleSchema);
