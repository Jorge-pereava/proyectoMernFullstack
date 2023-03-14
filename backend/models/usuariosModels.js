import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const usuarioSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token:{
        type:String
    },
    confirmado:{
        type:Boolean,
        default: false
    }
},{
    timestamps: true  //Me crea 2 columnas más, una de creado y otra de actualizado 
})

usuarioSchema.pre('save', async function(next){
    if(!this.isModified('password')){ //Si no está haciendo una modificación o cambio de contraseña no haga nada, para que no la vuelva a hashear
        next()
    };
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

usuarioSchema.methods.comprobarPasword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password)
}

const usuarioModel = mongoose.model('Usuarios',usuarioSchema);

export default usuarioModel;
