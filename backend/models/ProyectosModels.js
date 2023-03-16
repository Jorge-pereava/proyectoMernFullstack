import mongoose from "mongoose";

const proyectosSchema = mongoose.Schema({
    nombreProyecto:{
        type:String,
        required:true,
        trim:true,
    },
    descripcionProyecto:{
        type:String,
        required:true,
        trim:true,
    },
    fechaEntregaProyecto:{
        type:Date,
        default: Date.now()
    },
    clienteProyecto:{
        type:String,
        required:true,
        trim:true,
    },
    creadorProyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios"
    },
    colaboradoresProyecto:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuarios"
        }
    ]

},{
    timestamps: true  //Me crea 2 columnas más, una de creado y otra de actualizado 
})

const proyectosModel = mongoose.model("Proyectos", proyectosSchema)

export default proyectosModel;