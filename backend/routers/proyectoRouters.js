import express from 'express';

import{obtenerProyectos,nuevoProyecto,obtenerProyecto,editarProyecto,eliminarProyecto,agregarColaboradores,eliminarColaboradores,obtenerTareas}
from '../controllers/proyectoControllers.js';

import checkAuth from '../middleware/checkAuth.js'

const ProyectoRouter = express.Router();

//Obtener todos los proyectos
ProyectoRouter.get('/',checkAuth,obtenerProyectos);

//Agregar nuevo Proyecto
ProyectoRouter.post('/',checkAuth,nuevoProyecto);

//Obtener, editar o eliminar un proyecto según su Id
ProyectoRouter.route('/').get(checkAuth,obtenerProyecto).put(checkAuth,editarProyecto).delete(checkAuth,eliminarProyecto);

//Agregar y elimnar colaboradores
ProyectoRouter.route('/').post(checkAuth,agregarColaboradores).post(checkAuth,eliminarColaboradores);

ProyectoRouter.get('/',checkAuth,obtenerTareas)


export default ProyectoRouter;