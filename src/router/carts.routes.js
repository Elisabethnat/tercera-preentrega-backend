import { Router } from 'express';
import cartsController from '../controllers/carts.controller.js';
import { authorization, passportError } from '../utils/messageErrors.js';

const cartRouter = Router();
//Get Carts 
cartRouter.get('/', cartsController.getCarts);
//Get cart by id
cartRouter.get('/:cid', cartsController.getCart);
// Create Carts 
cartRouter.post('/', cartsController.postCart);
//Finalizar compra
cartRouter.post('/:cid/purchase', passportError('jwt'), authorization('user'), cartsController.purchaseCart);
//add product to cart (agrega el producto ok y actualiza si existe)
cartRouter.put('/:cid/products/:pid', passportError('jwt'), authorization('user'),cartsController.putProductsToCart);
//update cart by id 
cartRouter.put('/:cid', passportError('jwt'), authorization('user'),cartsController.updateProductToCart);
// delete pid from cart 
cartRouter.delete('/:cid/product/:pid', passportError('jwt'), authorization('user'),cartsController.deleteProductCart);
//Delete all prodcuts from cart
cartRouter.delete('/:id', passportError('jwt'), authorization('user'),cartsController.deleteProductsCart);

export default cartRouter;

