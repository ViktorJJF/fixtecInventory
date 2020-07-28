const SalesDetail = require("../models/SalesDetails.js");
const Product = require("../models/Products.js");
const list = (req, res) => {
  let orderId = req.query.orderId;
  SalesDetail.find({
    orderId,
    status: true,
  }).exec((err, payload) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      payload,
    });
  });
};
const create = (req, res) => {
  let body = req.body;
  let salesDetail = new SalesDetail({
    orderId: body.orderId,
    productId: body.productId,
    price: body.price,
    qty: body.qty,
  });

  salesDetail.save((err, payload) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      payload,
    });
  });
};
const update = (req, res) => {
  let id = req.params.id;
  let body = req.body;
  SalesDetail.findByIdAndUpdate(
    id,
    body,
    {
      new: true,
    },
    (err, payload) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        payload,
      });
    }
  );
};
const deletes = (req, res) => {
  let id = req.params.id;
  let body = req.body;
  Product.findOne(
    {
      _id: body.productId,
    },
    (err, product) => {
      if (err) {
        return console.log(err);
      }
      product
        .update({
          stock: product.stock - body.qty,
        })
        .then((newStock) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  );

  SalesDetail.findByIdAndRemove(id, (err, payload) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      payload,
    });
  });
};

module.exports = {
  list,
  create,
  update,
  deletes,
};
