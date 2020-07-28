const express = require("express");
const router = express.Router();

//Controllers
const typesController = require("../../controllers/typesController");
const brandsController = require("../../controllers/brandsController");
const colorsController = require("../../controllers/colorsController");
const productsController = require("../../controllers/productsController");
const salesController = require("../../controllers/salesController");
const salesDetailsController = require("../../controllers/salesDetailsController");
const purchasesController = require("../../controllers/purchasesController.js");
const purchaseDetailsController = require("../../controllers/purchaseDetailsController.js");
const usersController = require("../../controllers/usersController");

//CRUD types
router.get("/types", typesController.list);
router.get("/types/all", typesController.listAll);
router.get("/types/:id", typesController.listOne);
router.post("/types", typesController.create);
router.put("/types/:id", typesController.update);
router.delete("/types/:id", typesController.deletes);
//CRUD brands
router.get("/brands", brandsController.list);
router.get("/brands/all", brandsController.listAll);
router.get("/brands/:id", brandsController.listOne);
router.post("/brands", brandsController.create);
router.put("/brands/:id", brandsController.update);
router.delete("/brands/:id", brandsController.deletes);
//CRUD colors
router.get("/colors", colorsController.list);
router.get("/colors/all", colorsController.listAll);
router.get("/colors/:id", colorsController.listOne);
router.post("/colors", colorsController.create);
router.put("/colors/:id", colorsController.update);
router.delete("/colors/:id", colorsController.deletes);
//CRUD products
router.get("/products", productsController.list);
router.get("/products/all", productsController.listAll);
router.get("/products/:id", productsController.listOne);
router.post("/products", productsController.create);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.deletes);
//CRUD sales
router.get("/sales", salesController.list);
router.get("/sales/all", salesController.listAll);
router.get("/sales/:id", salesController.listOne);
router.post("/sales", salesController.create);
router.put("/sales/:id", salesController.update);
router.delete("/sales/:id", salesController.deletes);
//CRUD orderDetails
router.get("/sales-details", salesDetailsController.list);
router.post("/sales-details", salesDetailsController.create);
router.put("/sales-details/:id", salesDetailsController.update);
router.delete("/sales-details/:id", salesDetailsController.deletes);
//CRUD purchases
router.get("/purchases", purchasesController.list);
router.get("/purchases/all", purchasesController.listAll);
router.get("/purchases/:id", purchasesController.listOne);
router.post("/purchases", purchasesController.create);
router.put("/purchases/:id", purchasesController.update);
router.delete("/purchases/:id", purchasesController.deletes);
// router.get("/purchases/count", purchasesController.count);
//CRUD purchaseDetails
router.get("/purchase-details", purchaseDetailsController.list);
router.post("/purchase-details", purchaseDetailsController.create);
router.put("/purchase-details/:id", purchaseDetailsController.update);
router.delete("/purchase-details/:id", purchaseDetailsController.deletes);
//CRUD USERS // SELLERS
router.get("/users", usersController.list);
router.post("/users", usersController.create);
router.put("/users/:id", usersController.update);
router.delete("/users/:id", usersController.deletes);
router.post("/login", usersController.login);
router.post("/users/logged", usersController.getUser);
router.get("/logout", usersController.logout);

module.exports = router;
