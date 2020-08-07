const faker = require("faker");
const json = [];

module.exports = new Promise(async (resolve, reject) => {
  //GET FOREIGN IDS
  const { selectRandomId } = require("../server/helpers/utils");
  const User = require("../server/models/Users");
  var users = await User.find();
  //GET DATA
  for (let i = 0; i < 15; i++) {
    json.push({
      name: faker.commerce.color(),
      userId: selectRandomId(users),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
  }
  //END DATA
  resolve(json);
});
