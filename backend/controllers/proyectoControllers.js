import proyectosModel from '../models/ProyectosModels.js'

//Listar todos los proyectos
const obtenerProyectos = async(req,res) =>{
    const proyectos = await proyectosModel.find().where('creadorProyecto').equals(req.usuario)
    res.json(proyectos)
} 

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

//Listar proyecto según su ID
const obtenerProyecto = async(req,res)=>{
    const {id} = req.params

    const verProyecto = await proyectosModel.findById(id);
    
    if(!verProyecto){
        const error = new Error('No encontrado');
        return res.status(404).json({msg:error.message})
    }

    if(verProyecto.creadorProyecto.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no valida');
        return res.status(404).json({msg:error.message})
    }
    res.json(verProyecto)

}

//Editar proyecto según su ID
const editarProyecto = async(req,res)=>{

}

//Eliminar proyecto según su ID
const eliminarProyecto = async(req,res)=>{

}

//Agregar los colaboradores que van a hacer parte del proyecto
const agregarColaboradores = async(req,res)=>{

}


//Eliminar los colaboradores
const eliminarColaboradores = async(req,res)=>{

}

//Obtener tareas según su ID
const obtenerTareas = async(req,res)=>{

}

export{
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaboradores,
    eliminarColaboradores,
    obtenerTareas
}



