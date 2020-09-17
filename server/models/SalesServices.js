const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let salesServicesSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    services: [
      {
        serviceId: {
          type: Schema.Types.ObjectId,
          ref: "Services",
        },
        cost: {
          products: [
            {
              type: Schema.Types.ObjectId,
              ref: "Products",
            },
          ],
          value: { type: Number, default: 0 },
        },
        salePrice: { type: Number, default: 0 },
        repairedItem: {
          itemModel: String,
          itemType: String,
          itemBrand: String,
        },
        description: String,
        history: {
          type: Boolean,
          default: false,
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
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
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("SalesServices", salesServicesSchema);
