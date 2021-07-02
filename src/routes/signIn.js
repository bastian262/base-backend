
const { Router } = require('express');
const { signIn } = require('../controllers/usuarios');

const router = Router();

router.post("/", signIn);


// router.patch('/', usuariosPatch );





module.exports = router;