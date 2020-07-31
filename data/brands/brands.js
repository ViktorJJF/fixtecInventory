const faker = require("faker");

const json = [];

for (let i = 0; i < 10; i++) {
  json.push({
    name: faker.lorem.word(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    userId: "5f2055e34c865518c8637734",
  });
}

module.exports = json;
