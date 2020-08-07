const faker = require("faker");
const json = [];

module.exports = new Promise(async (resolve, reject) => {
  //GET FOREIGN IDS
  const { selectRandomId } = require("../server/helpers/utils");
  const User = require("../server/models/Users");
  var users = await User.find();
  //GET DATA
  for (let i = 0; i < 21; i++) {
    json.push({
      name: faker.company.companyName(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      userId: selectRandomId(users),
    });
  }
  //END DATA
  resolve(json);
});
