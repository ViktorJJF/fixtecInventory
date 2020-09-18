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
    timestamps: true,
  }
);

//auto populate
var autoPopulateLead = function (next) {
  this.populate("services.serviceId");
  this.populate("services.cost.products");
  next();
};
var autoPopulateLead2 = function (doc, next) {
  doc
    .populate("services.serviceId")
    .populate("services.cost.products")
    .execPopulate()
    .then(function () {
      next();
    });
};

salesServicesSchema
  .pre("findOne", autoPopulateLead)
  .pre("find", autoPopulateLead);
salesServicesSchema.post("save", autoPopulateLead2);

module.exports = mongoose.model("SalesServices", salesServicesSchema);
