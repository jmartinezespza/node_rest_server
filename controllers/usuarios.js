
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuarioGet = async (  req = request, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {estado: true}

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    //const total = await Usuario.countDocuments(query);

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ]);

    res.json({
        total,
        usuarios
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
    const { _id, password, google, correo, ...resto } = req.body;

    // Validar contra base de datos
    if (password) {        
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario);
};

const usuarioPatch = ( req, res = response ) => {

    res.json({
        msg: 'Patch api controllador',
    });
};

const usuarioDelete = async ( req, res = response ) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json(usuario);
};


module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioPatch,
    usuarioDelete,
}
