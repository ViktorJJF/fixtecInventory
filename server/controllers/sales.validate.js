const { validationResult } = require("../helpers/utils");
const { check } = require("express-validator");

/**
 * Validates create new item request
 */
exports.create = [
  check("commerce")
    .exists()
    .withMessage("Debes seleccionar el negocio")
    .not()
    .isEmpty()
    .withMessage("Debes seleccionar el negocio")
    .trim(),
  (req, res, next) => {
    validationResult(req, res, next);
  },
];

/**
 * Validates update item request
 */
exports.update = [
  check("commerce")
    .exists()
    .withMessage("Debes seleccionar el negocio")
    .not()
    .isEmpty()
    .withMessage("Debes seleccionar el negocio")
    .trim(),
  (req, res, next) => {
    validationResult(req, res, next);
  },
];

/**
 * Validates get item request
 */
exports.listOne = [
  check("id")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  (req, res, next) => {
    validationResult(req, res, next);
  },
];

/**
 * Validates delete item request
 */
exports.deletes = [
  check("id")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
  (req, res, next) => {
    validationResult(req, res, next);
  },
];
