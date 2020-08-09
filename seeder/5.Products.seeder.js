const faker = require("faker");
const json = [];

module.exports = new Promise(async (resolve, reject) => {
  //GET FOREIGN IDS
  const { selectRandomId } = require("../server/helpers/utils");
  const User = require("../server/models/Users");
  const Brands = require("../server/models/Brands");
  const Colors = require("../server/models/Colors");
  const Types = require("../server/models/Types");
  var users = await User.find();
  var brands = await Brands.find();
  var colors = await Colors.find();
  var types = await Types.find();
  //GENERATE IMAGES
  let images = [];
  for (let i = 0; i < 5; i++) {
    images.push({ path: faker.image.technics() });
  }
  //GET DATA
  for (let i = 0; i < 200; i++) {
    json.push({
      name: faker.lorem.word(),
      typeId: selectRandomId(types),
      brandId: selectRandomId(brands),
      colorId: selectRandomId(colors),
      userId: selectRandomId(users),
      stock: faker.random.number({
        min: 0,
        max: 100,
      }),
      minStock: 10,
      purchasePrice: faker.commerce.price(50, 100),
      price: faker.commerce.price(150, 200),
      description: faker.lorem.paragraph(),
      proportionPrice: faker.finance.amount(0.1, 1, 1),
      featured: false,
      slider: false,
      images,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
  }
  //END DATA
  resolve(json);
});
