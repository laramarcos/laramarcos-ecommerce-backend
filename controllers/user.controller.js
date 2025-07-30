const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET



async function getUsers(req, res) {
  try {
    const users = await User.find().select({ password: 0, __v: 0});

    return res.status(200).send({
      message: "Usuarios obtenidos correctamente",
      users
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error al obtener los usuarios" });
  }
}

async function createUser(req, res) {

    try {
        const user = new User(req.body);
        if(user.password) {

          const hashedPassword = bcrypt.hashSync(user.password, saltRounds);

          user.password = hashedPassword;
        }

        const userSaved = await user.save();
        return res.status(201).send({
            message: "Usuario creado correctamente",
            user: userSaved
        });      
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "El usuario no se ha podido crear"
        });
    }
}

async function getUserById(req, res) {
  try {
    const id = req.params.id;

    const user = await User.findById(id).select({ password: 0, __v: 0});

    return res.status(200).send({
      message: "Usuario obtenido correctamente",
      user
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error al obtener el usuario" });
  }
}

async function deleteUserById(req, res) {
  try {
    const id = req.params.id;

    const userDeleted = await User.findByIdAndDelete(id);

    console.log("User deleted", userDeleted);

    if (!userDeleted) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    return res.status(200).send({
      message: "Usuario eliminado correctamente",
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error al eliminar el usuario" });
  }
}


async function updateUserById(req, res) {
  try {
    const { id } = req.params;
    const userData = req.body;

    // Verificar si el usuario existe
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar el usuario
    const userUpdated = await User.findByIdAndUpdate(id, userData, { new: true });

    // Responder con el usuario actualizado
    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      user: userUpdated
    });

  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return res.status(500).json({ message: "Error al actualizar el usuario" });
  }
}

async function loginUser(req, res) {
  try {
    // 1 - Recibir los datos del usuario
    const { email, password } = req.body;

    // 2 - Validar que los datos no estén vacíos
    if (!email || !password) {
      return res.status(400).send({ message: "Email y contraseña son obligatorios" });
    }

    // 3 - Buscar el usuario por email
    const user = await User.findOne({ email: email.toLowerCase() });

    // 3a - Si no existe, devolver error
    if (!user) {
      return res.status(400).send({ message: "Usuario o contraseña incorrectos" });
    }

    // 3b - Comparar contraseña ingresada con la guardada en la base
    const isValidPassword = bcrypt.compareSync(password, user.password);

    // 4a - Si la contraseña es incorrecta
    if (!isValidPassword) {
      return res.status(400).send({ message: "Usuario o contraseña incorrectos" });
    }

    // 4b - Si la contraseña es correcta, eliminarla del objeto antes de enviar
    user.password = undefined;

    const token = jwt.sign(user.toJSON(), secret, { expiresIn: "1h"} )

    console.log("Token generado:", token);

    // 5 - Devolver el usuario y un mensaje de éxito
    return res.status(200).send({
      message: "Inicio de sesión exitoso",
      user,
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error al iniciar sesión" });
  }
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUserById,
    updateUserById,
    loginUser,

};
