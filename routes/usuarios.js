
const {Router} = require('express');
const {usuarioGet, usuarioPost, usuarioDelete, usuarioPut, usuarioPatch} = require('../controllers/usuarios');

const router = Router();


router.get('/', usuarioGet);

router.put('/:id', usuarioPut);

router.post('/', usuarioPost);

router.delete('/', usuarioDelete);

router.patch('/', usuarioPatch);

module.exports = router;
