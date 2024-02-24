import { Router } from 'express';
import productsController from '../controllers/product.controller.js';
import { passportError, authorization } from '../utils/messageErrors.js';

const productRouter = Router();
//Ruta inicial de Products
productRouter.get('/', productsController.getProducts);
//Ruta para traer un producto según su ID
productRouter.get('/:pid', productsController.getProduct);
//Ruta para crear un producto
productRouter.post('/', passportError('jwt'), authorization('Admin'), productsController.postProduct);
//Ruta para crear un producto o actualizar en caso de que exista
productRouter.put('/:pid', passportError('jwt'), authorization('Admin'), productsController.putProduct);
//Ruta para borrar un producto según su ID
productRouter.delete('/:pid', passportError('jwt'), authorization('Admin'), productsController.deleteProduct);

export default productRouter;

