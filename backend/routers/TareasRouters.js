import express from 'express';
import {
    agregarTarea,
    obtenertarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
} from '../controllers/tareasControllers.js'

import checkAuth from '../middleware/checkAuth.js';

const tareaRoutes = express.Router();

tareaRoutes.post('/',checkAuth,agregarTarea);

tareaRoutes.route('/:id').get(checkAuth,obtenertarea).put(checkAuth,actualizarTarea).delete(checkAuth,eliminarTarea);

tareaRoutes.get('/estado/:id', checkAuth, cambiarEstado);

export default tareaRoutes;
