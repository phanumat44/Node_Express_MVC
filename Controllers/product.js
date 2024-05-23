const Product = require('../Models/Product');

exports.Readall = async (req, res) => {

    Product.find()
        .then(products => {
            res.send({ status: "ok", products: products });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving products."
            });
        });

};

exports.Readone = async (req, res) => {

    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.id
                });
            }
            res.send({ status: "ok", products: product });
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving product with id " + req.params.id
            });
        });
};

exports.Create = async (req, res) => {

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        quantity: req.body.quantity,
        img_url: req.body.img_url
    });

    product.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while creating the product."
            });
        });
};

exports.Update = async (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    Product.findByIdAndUpdate(req.params
        .id, req.body, { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.id
                });
            }
            res.send({ status: "ok", message: "product updated!", products: product });
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating product with id " + req.params.id
            });
        });
};

exports.Remove = async (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.id
                });
            }
            res.send({ status: "ok", message: "product deleted!" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete product with id " + req.params.id
            });
        });
};