const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let servicesSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del servicio es requerido"],
    },
    typeId: {
      type: Schema.Types.ObjectId,
      ref: "Types",
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
  next();
};
var autoPopulateLead2 = function (doc, next) {
  doc
    .populate("typeId")
    .execPopulate()
    .then(function () {
      next();
    });
};

servicesSchema.pre("findOne", autoPopulateLead).pre("find", autoPopulateLead);
servicesSchema.post("save", autoPopulateLead2);

module.exports = mongoose.model("Services", servicesSchema);
