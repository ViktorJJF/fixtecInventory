const faker = require("faker");
const json = [];

module.exports = new Promise(async (resolve, reject) => {
  //GET FOREIGN IDS
  const { selectRandomId } = require("../server/helpers/utils");
  const Product = require("../server/models/Products");
  const Sale = require("../server/models/Sales");
  let products = await Product.find();
  let sales = await Sale.find();
  // //GET DATA
  for (let i = 0; i < 600; i++) {
    json.push({
      saleId: selectRandomId(sales),
      productId: selectRandomId(products),
      salePrice: faker.commerce.price(50, 100),
      qty: faker.random.number(10),
    });
  }
  //END DATA
  resolve(json);
});
