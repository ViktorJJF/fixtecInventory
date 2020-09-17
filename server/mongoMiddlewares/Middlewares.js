const Product = require("../models/Products.js");

const updateStock = async (productId, qty, session) => {
  try {
    let product = session
      ? await Product.findOne({ _id: productId }).session(session)
      : await Product.findOne({ _id: productId });
    product.stock = product.stock + qty; // send + or -
    await product.save();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  updateStock,
};
