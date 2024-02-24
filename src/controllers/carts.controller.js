import cartModel from '../models/carts.models.js';

const getCarts = async (req, res) => {
    const {limit}  = req.query;
    try{
        const carts = await cartModel.find().limit(limit);
        res.status(200).send({ resultado: 'OK', message: carts });

    }catch (error) {
        res.status(400).send({error: `Error al consultar carrito: ${error}`});
    };
};
//Get cart by id
const getCart = async (req, res) => {
    const { cid } = req.params;
    try{
        const cart = await cartModel.findById(cid);
        cart 
            ? res.status(200).send({resultado: 'OK', messag:cart})
            : res.status(404).send({resultado:'Not Found', message: cart});

    }catch (error){
        res.status(400).send ({ error:`Error al consultar carritos: ${error}`});
    };
};
// Create Carts
const postCart = async (req, res) => {
    try{
        const respuesta = await cartModel.create({}); //o (req.body)
        res.status(200).send({ resultado: 'OK', message: respuesta });
        
    } catch(error){
        res.status(400).send ({ error:`Error al crear carritos: ${error}`});
    };
};
//put product to cart (agrega el producto ok y actualiza si existe)
const putProductsToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        // Verificar si el carrito existe
        const cart = await cartModel.findByIdAndUpdate(cid);
        !cart ?  res.status(404).send({ resultado: 'Cart not found' }) : ""
        
        // Verificar si existe el producto
        const prodIndex = cart.products.findIndex(prod => prod.id_prod.toString() === pid);

        prodIndex !== -1 ?
            // Si el producto ya existe, actualiza la cantidad
            cart.products[prodIndex].quantity += Number(quantity):
            // Si el producto no existe, agrega uno nuevo al carrito
            cart.products.push({ id_prod: pid, quantity });

        // Guardar el carrito actualizado en la base de datos
        await cart.save();

        res.status(200).send({ resultado: 'OK', message: cart });
    } catch (error) {
        res.status(400).send({ error: `Error al agregar productos: ${error}` });
    };
};
//update cart by id 
const updateProductToCart = async (req, res) => {
    const { cid } = req.params;
	const { updateProducts } = req.body;

	try {
		const cart = await cartModel.findById(cid);
		updateProducts.forEach(prod => {
			const productExists = cart.products.find(cartProd => cartProd.id_prod.toString() == prod.id_prod);
			productExists ?	productExists.quantity += prod.quantity
                          : cart.products.push(prod);			
		}); 
		await cart.save();
		cart
			? res.status(200).send({ resultado: 'OK', message: cart })
			: res.status(404).send({ resultado: 'Not Found', message: cart });
	} catch (error) {
		res.status(400).send({ error: `Error al agregar productos: ${error}` });
	};
};
//finalizar compra
const purchaseCart = async (req, res) => {
	const { cid } = req.params;
	try {
		const cart = await cartModel.findById(cid);
		const products = await productModel.find();

		if (cart) {
			const user = await userModel.find({ cart: cart._id });
			const email = user[0].email;
			let amount = 0;
			const purchaseItems = [];
			cart.products.forEach(async item => {
				const product = products.find(prod => prod._id == item.id_prod.toString());
				if (product.stock >= item.quantity) {
					amount += product.price * item.quantity;
					product.stock -= item.quantity;
					await product.save();
					purchaseItems.push(product.title);
				}
				//ticket?info=${amount}
			});
			console.log(purchaseItems);
			await cartModel.findByIdAndUpdate(cid, { products: [] });
			res.redirect(
				`http://localhost:8080/api/tickets/create?amount=${amount}&email=${email}`
			);
		} else {
			res.status(404).send({ resultado: 'Not Found', message: cart });
		}
	} catch (error) {
		res.status(400).send({ error: `Error al consultar carrito: ${error}` });
	}
};
// delete pid from cart
const deleteProductCart = async (req, res) => {
    const { cid, pid } = req.params;

	try {
		const cart = await cartModel.findById(cid);
		if (cart) {
			const productIndex = cart.products.findIndex(prod => prod.id_prod == pid);
			let deletedProduct;
			if (productIndex !== -1) {
				deletedProduct = cart.products[productIndex];
				cart.products.splice(productIndex, 1);
			} else {
				res.status(404).send({ resultado: 'Product Not Found', message: cart });
				return;
			};

			await cart.save();
			res.status(200).send({ resultado: 'OK', message: deletedProduct });
            
		} else {
			res.status(404).send({ resultado: 'Cart Not Found', message: cart });
		}
	} catch (error) {
		res.status(400).send({ error: `Error al eliminar producto: ${error}` });
	};
};
//Delete all prodcuts from cart
const deleteProductsCart = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await cartModel.findById(id);
        if (!cart) {
            res.status(404).send({ result: 'Cart not found', message: cart });
        }
        cart.products = [];
        await cart.save();
        res.status(200).send({ result: 'OK', message: cart });
    } catch (error) {
        res.status(400).send({ error: `Error al vaciar carrito: ${cart}` });
    };
};

const cartsController = {
	getCarts,
	getCart,
	postCart,
	putProductsToCart,
	updateProductToCart,
	deleteProductCart,
	deleteProductsCart,
    purchaseCart,
};

export default cartsController;