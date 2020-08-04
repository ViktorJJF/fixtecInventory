const { validationResult } = require("../helpers/utils");
const { check } = require("express-validator");

/**
 * Validates create new item request
 */
exports.create = [
  check("name")
    .exists()
    .withMessage("El nombre de la calidad es requerido")
    .not()
    .isEmpty()
    .withMessage("El nombre de la calidad debe ser válido")
    .trim(),
  (req, res, next) => {
    validationResult(req, res, next);
  },
];

/**
 * Validates update item request
 */
exports.update = [
  check("name")
    .exists()
    .withMessage("MISSING")
    .not()
    .isEmpty()
    .withMessage("IS_EMPTY"),
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
