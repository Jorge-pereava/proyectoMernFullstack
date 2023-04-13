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
    const {id} = req.params;
    const tarea = await tareasModels.findById(id).populate("proyecto");

    if(!tarea){
        const error = new Error('Tarea no encontrada');
        return res.status(404).json({msj: error.message})
    }

    if(tarea.proyecto.creadorProyecto.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no valida');
        return res.status(403).json({msg:error.message})
    }

    try {
        res.json(tarea)
    } catch (error) {
        console.log(`Hubo un error al lista una tarea: ${error}`)
    }
}

const actualizarTarea = async(req,res)=>{
    const {id} = req.params;
    const actualizarTarea = await tareasModels.findById(id).populate("proyecto");
    if(!actualizarTarea){
        const error = new Error('Tarea no encontrada');
        return res.status(404).json({msg: error.message})
    }
    if(actualizarTarea.proyecto.creadorProyecto.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no valida');
        return res.status(403).json({msg:error.message})
    }

    actualizarTarea.nombre = req.body.nombre || actualizarTarea.nombre
    actualizarTarea.descripcion = req.body.descripcion || actualizarTarea.descripcion
    actualizarTarea.prioridad = req.body.prioridad || actualizarTarea.prioridad
    actualizarTarea.fechaEntrega = req.body.fechaEntrega || actualizarTarea.fechaEntrega

    try {
        const tareaAlmacenada = await actualizarTarea.save();
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(`hubo un error al actualizar la tarea:${error}`)
    }
}

const eliminarTarea = async(req,res)=>{
    const {id} = req.params;
    const eliminarTarea = await tareasModels.findById(id).populate("proyecto");
    if(!eliminarTarea){
        const error = new Error('Tarea no encontrada');
        return res.status(404).json({msg: error.message})
    }
    if(eliminarTarea.proyecto.creadorProyecto.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no valida');
        return res.status(403).json({msg:error.message})
    }

    try {
        await eliminarTarea.deleteOne();
        res.json({msg: 'Tarea eliminada Correctamente'})
    } catch (error) {
        console.log(`hubo un error al eliminar la tarea:${error}`)
    }
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