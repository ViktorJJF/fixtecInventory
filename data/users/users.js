const faker = require("faker");
// faker.locale='es'
console.log("este es un email: ", faker.internet.email);
const json = [];

for (let i = 0; i < 5; i++) {
  json.push({
    role: "ADMIN",
    status: true,
    first_name: faker.name.lastName(),
    last_name: faker.name.firstName(),
    password: "$2b$10$AJ1UHcEsKRxAy/fzbs2ws.9snr3X7dFtSZThHKXo7.NdilOJIXgdm",
    email: faker.internet.email(),
  });
}

module.exports = json;
