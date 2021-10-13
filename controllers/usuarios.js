
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuarioGet = (  req = request, res = response ) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'Get api controllador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
};

const usuarioPost = async ( req, res = response ) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt )

    // Guardar en la bd
    await usuario.save();

    res.json({
        msg: 'Post api - controllador',
        usuario
    });
};

const usuarioPut = async ( req, res = response ) => {

    const { id } = req.params;
    const { password, google, correo, ...resto } = req.body;

    // Validar contra base de datos
    if (password) {        
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'Put api controllador',
        usuario
    });
};

const usuarioPatch = ( req, res = response ) => {

    res.json({
        msg: 'Patch api controllador',
    });
};

const usuarioDelete = ( req, res = response ) => {

    res.json({
        msg: 'Delete api controllador',
    });
};


module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioPatch,
    usuarioDelete,
}
