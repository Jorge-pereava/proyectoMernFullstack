import mongoose from "mongoose";

const proyectosSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        trim:true,
    },
    descripcion:{
        type:String,
        required:true,
        trim:true,
    },
    fechaEntrega:{
        type:Date,
        default: Date.now()
    },
    cliente:{
        type:String,
        required:true,
        trim:true,
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios"
    },
    colaboradores:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuarios"
        }
    ]

})

const proyectosModel = mongoose.model("Proyectos", proyectosSchema)

export default proyectosModel;