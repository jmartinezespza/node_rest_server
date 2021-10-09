
const { response, request } = require('express');

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

const usuarioPost = ( req, res = response ) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'Post api - controllador',
        nombre,
        edad
    });
};

const usuarioPut = ( req, res = response ) => {

    const { id } = req.params;

    res.json({
        msg: 'Put api controllador',
        id
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
