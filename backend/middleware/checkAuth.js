import jwt from "jsonwebtoken";
import usuarioModel from "../models/usuariosModels.js";

const checkAuth = async(req,res, next) =>{
    let token;
    //En los header es donde se va a enviar los JsonWebToken
    //console.log(req.headers.authorization)
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))//Con esto enviamos un token por medio del headers(esto para postman)
    {
       try {
            token = req.headers.authorization.split(" ")[1] 
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.usuario = await usuarioModel.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v");
            return next()//Para irnos al siguiente middleware

       } catch (error) {
            return res.status(404).json({msg:'Hubo un error al comprobar el JWT en checkAuth'})
       }
    }
    if(!token){
        const error = new Error('Token no valido para checkAuth')
        return res.status(401).json({msg:error.message})
    }

    next();
}

export default checkAuth;