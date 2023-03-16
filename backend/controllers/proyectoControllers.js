import proyectosModel from '../models/ProyectosModels.js'

//Listar todos los proyectos
const obtenerProyectos = async(req,res) =>{

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



