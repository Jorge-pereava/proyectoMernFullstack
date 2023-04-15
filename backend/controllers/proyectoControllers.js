import proyectosModel from '../models/ProyectosModels.js'
import tareasModels from '../models/TareasModels.js';

//Insertar un proyecto nuevo
const nuevoProyecto = async(req,res)=>{
    const proyecto = new proyectosModel(req.body);
    proyecto.creadorProyecto = req.usuario._id

    try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(`Hubo un error al insertar el nuevo proyecto:${error}`)
    }
}

//Listar todos los proyectos
const obtenerProyectos = async(req,res) =>{
    const proyectos = await proyectosModel.find().where('creadorProyecto').equals(req.usuario)
    res.json(proyectos)
} 


//Listar proyecto según su ID
const obtenerProyecto = async(req,res)=>{
    const {id} = req.params

    const verProyecto = await proyectosModel.findById(id);
    
    if(!verProyecto){
        const error = new Error('Proyecto no encontrado');
        return res.status(404).json({msg:error.message})
    }

    if(verProyecto.creadorProyecto.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no valida');
        return res.status(404).json({msg:error.message})
    }


    //Obtener las tareas del proyecto, cada que liste un proyecto, que se traiga consigo las tareas que tiene asociadas
    const tareas = await tareasModels.find().where("proyecto").equals(verProyecto._id);
    res.json({
        verProyecto,
        tareas
    })

}

//Editar proyecto según su ID
const editarProyecto = async(req,res)=>{
    const {id} = req.params;
    const editarProyectos = await proyectosModel.findById(id);
    
    if(!editarProyectos){
        const error = new Error('No encontrado');
        return res.status(401).json({msg: error.message})
    }

    if(editarProyectos.creadorProyecto.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no valida');
        return res.status(401).json({msg: error.message})   
    }

    editarProyectos.nombreProyecto = req.body.nombreProyecto || editarProyectos.nombreProyecto;
    editarProyectos.descripcionProyecto = req.body.descripcionProyecto || editarProyectos.descripcionProyecto;
    editarProyectos.fechaEntregaProyecto = req.body.fechaEntregaProyecto || editarProyectos.fechaEntregaProyecto;
    editarProyectos.clienteProyecto = req.body.clienteProyecto || editarProyectos.clienteProyecto;

    try {
        await editarProyectos.save();
        res.json(editarProyectos)
    } catch (error) {
        console.log(`Hubo un error al actualizar el proyecto: ${error}`)
    }

}

//Eliminar proyecto según su ID
const eliminarProyecto = async(req,res)=>{
    const {id} = req.params;
    const editarProyectos = await proyectosModel.findById(id);
    
    if(!editarProyectos){
        const error = new Error('No encontrado');
        return res.status(401).json({msg: error.message})
    }

    if(editarProyectos.creadorProyecto.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no valida');
        return res.status(401).json({msg: error.message})   
    }
    try {
        await editarProyectos.deleteOne();
        res.json('Proyecto Eliminado correctamente')
    } catch (error) {
        console.log(`Error al eliminar un proyecto: ${error}`)
    }
}

//Agregar los colaboradores que van a hacer parte del proyecto
const agregarColaboradores = async(req,res)=>{

}


//Eliminar los colaboradores
const eliminarColaboradores = async(req,res)=>{

}


export{
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaboradores,
    eliminarColaboradores,
}



