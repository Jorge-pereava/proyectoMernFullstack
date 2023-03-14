import express from 'express';
import {
        registerUser,
        loginUser, 
        confirmarCuentas,
        olvidePassword,
        comprobarToken,
        nuevoPassword,
        perfil
    } from '../controllers/usuariosControllers.js';

import checkAuth from '../middleware/checkAuth.js'

const router = express.Router();

//AREAS PÚBLICAS QUE EL USUARIO PUEDE VER

//Registro de usuarios
router.post('/register',registerUser)

//Confirmar cuentas
router.get('/confirmar/:token',confirmarCuentas)

//logIn
router.post('/login', loginUser)

//Olvide password
    //Validar email
router.post('/olvide-password',olvidePassword)

    //Validar token
router.get('/olvide-password/:token',comprobarToken)

    //nuevo password
router.post('/olvide-password/:token',nuevoPassword)


//AREAS PRIVADAS QUE SOLO PODRÁ VER SI ESTA AUTENTICADO(LOGUEARSE)
router.get('/perfil',checkAuth, perfil)

export default router
