const Order = require('../models/Orders.js');
const OrderDetail = require('../models/OrderDetails.js');
const Product = require('../models/Products.js');
const list = (req, res) => {
    Order.find({
        status: true
    }).sort({
        'createdAt': 'desc'
    }).exec((err, payload) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            payload
        })
    });
}
const count = (req, res) => {
    Order.count().exec((err, count) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            payload: count
        })
    });
}
const create = (req, res) => {
    let body = req.body;
    let order = new Order({
        userId: body.userId,
    });

    order.save((err, payload) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: "Algo salió mal",
                err
            });
        }
        res.json({
            ok: true,
            message: "Venta creada con éxito",
            payload
        });
    });
}
const update = (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Order.findByIdAndUpdate(id, body, {
        new: true
    }, (err, payload) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: "Algo salió mal",
                err
            });
        }
        res.json({
            ok: true,
            message: "Venta actualizada con éxito",
            payload
        });
    });
}
const deletes = (req, res) => {
    let id = req.params.id;
    let body = req.body;

    OrderDetail.find({
        orderId: id
    }, (err, orderDetails) => {
        orderDetails.forEach(detail => {
            Product.findOne({
                _id: detail.productId
            }, (err, product) => {
                if (err) {
                    return console.log(err);
                }
                product.update({
                        stock: product.stock + detail.qty
                    }, ).then((newStock) => {})
                    .catch((err) => {
                        console.log(err);
                    });
            });
        });
    });
    OrderDetail.deleteMany({
        orderId: id
    }, function (err, deletedCount) {
        if (err) {
            return console.log(err);
        }
    });
    Order.findByIdAndRemove(id, (err, payload) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: "Algo salió mal",
                err
            });
        }
        res.json({
            ok: true,
            message: "Venta eliminada con éxito",
            payload
        });
    });
}

module.exports = {
    list,
    create,
    update,
    deletes,
    count
}