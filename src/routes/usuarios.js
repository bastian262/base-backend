
const { Router } = require('express');
const {check} = require('express-validator');
const {validarCampos, correoExiste} = require('../middlewares/validar-campos');
const { usuariosGet,
        // usuariosPut,
        usuariosPost,
        usuariosDelete,
         } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

// router.put('/:id', usuariosPut );

router.post('/',[
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom(correoExiste),
    check('nombre','El nombre no es válido').not().isEmpty(),
    validarCampos
], usuariosPost );

router.delete('/:id', usuariosDelete );

// router.patch('/', usuariosPatch );





module.exports = router;