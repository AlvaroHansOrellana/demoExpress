const User = require('../models/userModel');

const obtenerTodosLosUsuarios = async () => {
    return await User.find();
};

const obtenerUsuarioPorId = async (id) => {
    return await User.findById(id);
};

const crearUsuario = async (datosUsuario) => {
    const user = new User(datosUsuario);
    return await user.save();
};

const actualizarUsuario = async (id, datosUsuario) => {
    return await User.findByIdAndUpdate(id, datosUsuario, { new: true });
};

const eliminarUsuario = async (id) => {
    return await User.findByIdAndDelete(id);
};

module.exports = {
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};