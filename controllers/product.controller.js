const Product = require("../models/product.model");
const mongoose = require("mongoose");

async function createProduct(req, res) {
  try {
    console.log("req.body", req.body);

    const product = new Product(req.body);

    if(req.file) {
      console.log("req FILE multer", req.file);
      // Asignar el nombre del producto del archivo de la imagen al producto
      product.image = req.file.filename;
    } else {
      return res.status(400).send({
        message: "Debe enviar una imagen del producto"
      });
    }

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
    const products = await Product.find({}).select('-__v').sort({ name: 1 });
    
    // Asegúrate de devolver un array, incluso si está vacío
    if (!products || products.length === 0) {
      return res.status(200).json([]); // Devuelve array vacío, no null/undefined
    }

    res.status(200).json(products); // Formato { products: [...] } si prefieres
  } catch (error) {
    console.error("Error en getProducts:", error);
    res.status(500).json({ 
      message: "Error al obtener productos",
      error: error.message // Detalle del error
    });
  }
}


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
