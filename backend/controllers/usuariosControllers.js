import usuarioModel from '../models/usuariosModels.js';
import generarId from '../helpers/generarId.js'
import generarJWT from '../helpers/generarJWT.js';

//Registrar usuarios
const registerUser = async(req,res)=>{
        const {email} = req.body;
        const validarUsuario = await usuarioModel.findOne({email});
        if(validarUsuario){
            const error = new Error('El usuario ya existe');
            return res.status(404).json({msg: error.message})
        }
    try {
        const regUser = new usuarioModel(req.body);
        regUser.token = generarId();
        // const usuarioAlmacenado = await regUser.save();
        // res.json(usuarioAlmacenado);
        await regUser.save()
        res.json({msg: 'usuario almacenado correctamente, revisa tu email para confirmar tu cuenta'})

    } catch (error) {
        console.log(`No se pudo almacenar el usuario: ${error}`)
    }
    
}


//Confirmar cuentas
const confirmarCuentas = async(req,res)=>{
    const {token} = req.params
    const validarToken = await usuarioModel.findOne({token})
    
    if(!validarToken){
        const error = new Error('Token no valido')
        return res.status(403).json({msg: error.message})
    }

    try {
        validarToken.confirmado = true,
        validarToken.token = '';
        await validarToken.save();
        res.json({msg: 'Cuenta confirmada correctamente'})

    } catch (error) {
        console.log(`Hubo un error en la confirmación de las cuentas: ${{error}}`)
    }
}


//Validación de usuario o logIn
const loginUser = async(req,res)=>{
    try { 
        //validar que el usuario exista
        const {email, password} = req.body
        const validarUsuario = await usuarioModel.findOne({email})
        if(!validarUsuario){
            const error = new Error('El Usuario no existe')
            return res.status(404).json({msg: error.message})
        }

        //Validar que tenga una cuenta confirmada
        if(!validarUsuario.confirmado){
            const error = new Error('La cuenta no está confirmada')
            return res.status(403).json({msg: error.message})
        }

        //Validar password
        if(await validarUsuario.comprobarPasword(password)){
            res.json({
                _id: validarUsuario._id,
                name: validarUsuario.name,
                email: validarUsuario.email,
                token: generarJWT(validarUsuario._id)
            })
        }
        else{
            const error = new Error('Usuario y/o contraseña erronea')
            return res.status(404).json({msg: error.message})
        }
    }
    catch (error) {
        console.log(`Ha ocurrido un error al iniciar sesión: ${error}`)
    }
}

//Definir un nuevo password
    //Validar el email
const olvidePassword = async(req,res)=>{
    const {email} = req.body;
    const validarUsuario = await usuarioModel.findOne({email});
    if(!validarUsuario){
        const error = new Error('El Usuario no existe');
        return res.status(403).json({msg: error.message})
    }

    try {
        validarUsuario.token = generarId();
        await validarUsuario.save();
        res.json({msg: 'Se han enviado las instrucciones al email'})
        
    } catch (error) {
        console.log(`Hubo un error al validar el usuario en olvidePassword: ${error}`)
    }
}

    //Validar el token
const comprobarToken = async(req,res)=>{
    const {token} = req.params;
    const validarToken = await usuarioModel.findOne({token});

    if(validarToken){
        res.json({msg:'El token es valido y el usuario existe'})
    }else{
        const error = new Error('Token no valido')
        return res.status(404).json({msg: error.message})
    }


}   

    //Almacenar el nuevo password
const nuevoPassword = async(req,res)=>{
    const {token} = req.params;
    const {password} = req.body;
    const almacenaPassword = await usuarioModel.findOne({token});
    if(almacenaPassword){
        almacenaPassword.password = password;
        almacenaPassword.token = ''
        await almacenaPassword.save();
        res.json({msg: 'El password se ha modificado correctamente'})
    }else{
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message})
    }
}


const perfil = async(req,res)=>{
    //console.log('Desde Perfil')
    const{usuario} = req//Obtengo el usuario del servidor lo que almacené en la variable req.usuario en checkAuth
    res.json(usuario)
}

export{
    registerUser,
    confirmarCuentas,
    loginUser,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
}