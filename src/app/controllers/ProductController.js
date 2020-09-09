const Product = require("../models/Product");

const { mongooseToObject } = require("../../util/mongoose");

class ProductController {
  // [GET] /products/:slug
  show(req, res, next) {
    Product.findOne({ slug: req.params.slug })
      .then((product) =>
        res.render("products/show", {
          product: mongooseToObject(product),
        })
      )
      .catch(next);
  }
  create(req, res, next) {
    res.render("products/create");
  }
  store(req, res, next) {
    const product = new Product(req.body);
    product.save().then(() => res.redirect("/"));
  }
  edit(req, res, next) {
    Product.findById(req.params.id)
      .then((product) =>
        res.render("products/edit", { product: mongooseToObject(product) })
      )
      .catch(next);
  }
  update(req, res, next) {
    Product.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/products"))
      .catch(next);
  }
}
module.exports = new ProductController();
