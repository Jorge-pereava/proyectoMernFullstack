import JTW from 'jsonwebtoken';

const generarJWT = (id)=>{
    return JTW.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d'} )
}

export default generarJWT