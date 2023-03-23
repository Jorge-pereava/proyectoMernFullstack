import proyectosModel from "../models/ProyectosModels.js";
import tareasModels from "../models/TareasModels.js";

const agregarTarea = async(req,res)=>{
    const {proyecto} = req.body;
    const existeProyecto = await proyectosModel.findById(proyecto);
    if(!existeProyecto){
        const error = new Error('El proyecto no existe');
        return res.status(404).json({msg:error.message})
    };
    
    if(existeProyecto.creadorProyecto.toString() !== req.usuario._id.toString()){
        const error = new Error('No tienes los permisos para añadir tareas');
        return res.status(403).json({msg:error.message})
    }

    try {
        const almacenarTarea = await tareasModels.create(req.body);
        res.json(almacenarTarea)    
    } catch (error) {
        console.log(`hubo un error al almacenar las tareas`)
    }
    
}

const obtenertarea = async(req,res)=>{

}

const actualizarTarea = async(req,res)=>{

}

const eliminarTarea = async(req,res)=>{

}

const cambiarEstado = async(req,res)=>{

}

export{
    agregarTarea,
    obtenertarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}