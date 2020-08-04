const faker = require("faker");
faker.locale = "es_MX";
const json = [];

//Data
// for (let i = 0; i < 2; i++) {
json.push({
  role: "ADMIN",
  status: true,
  first_name: "Karla Xiomara",
  last_name: "Manga Nacarino",
  password: "$2b$05$ESBSlw8CwQMv.gcns.dDUuuV7TLsoLyZkoKg6R5VmwAPP7kF3ryH.",
  email: "kxmn@gmail.com",
});
// }
//END DATA

module.exports = new Promise(async (resolve) => {
  resolve(json);
});
