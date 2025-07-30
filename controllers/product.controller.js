const Product = require("../models/product.model");
const mongoose = require("mongoose");

async function createProduct(req, res) {
  try {
    const product = new Product(req.body);
    const productSaved = await product.save();

    return res.status(201).send({
      message: "Producto creado correctamente",
      product: productSaved,
    });
  } catch (error) {
    console.log(error);

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({
        message: "Los datos enviados no son correctos",
      });
    }

    return res.status(500).send({
      message: "El producto no se ha podido crear",
    });
  }
}


async function getProducts(req, res) {
    

    try {
        const products = await Product.find({})
            .select({ __v: 0 })
            .sort({ name: 1 })
            .collation({ locale: "es" })
            
    return res.status(200).send({
            message: "Productos obtenidos correctamente",
            products
        });
    
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: "Error al obtener los productos"});
}}

async function getProducts(req, res) {}

async function getProductById(req, res) {}

async function updateProductById(req, res) {}

async function deleteProductById(req, res) {}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById
};
