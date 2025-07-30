const Product = require("../models/product.model");
const mongoose = require("mongoose");
const path = require("path");

async function createProduct(req, res) {
  try {
    const product = new Product(req.body);

    if (req.file) {
      product.image = req.file.filename;
    } else {
      return res.status(400).send({
        message: "Debe enviar una imagen del producto",
      });
    }

    const productSaved = await product.save();

    return res.status(201).send({
      message: "Producto creado correctamente",
      product: productSaved,
    });
  } catch (error) {
    console.error(error);

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
    res.status(200).json(products || []);
  } catch (error) {
    console.error("Error en getProducts:", error);
    res.status(500).json({
      message: "Error al obtener productos",
      error: error.message,
    });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).select('-__v');
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
}

async function updateProductById(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({
      message: "Producto actualizado correctamente",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
}

async function deleteProductById(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
