import mongoose from 'mongoose';

const tareasSchema = mongoose.Schema({
    nombre:{
        type:String,
        trim:true,
        required:true,
    },
    descripcion:{
        type:String,
        trim:true,
        required:true
    },
    estado:{
        type:Boolean,
        default:false
    },
    fechaEntrega:{
        type:Date,
        default: Date.now()
    },
    prioridad:{
        type:String,
        required:true,
        Number:["Baja", "Media", "Alta"]
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Proyectos"
    }
},{
    timestamps: true
})


const tareasModels = mongoose.model('Tareas',tareasSchema);

export default tareasModels;