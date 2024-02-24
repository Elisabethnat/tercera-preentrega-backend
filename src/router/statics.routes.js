import { Router } from "express";
import productsModel from "../models/products.model.js";

const staticsRouter = Router();

staticsRouter.get('/', (req, res) => {
    res.render('products', {
        rutaCSS: 'products',
        rutaJS: 'products',
    });
});

staticsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { 
        rutaCSS: "realTimeProducts",
        rutaJS: "realTimeProducts"
    });    
});


staticsRouter.get('/products', async (req, res) => {
    const products = await productsModel.find().lean();
    const info = req.query.info;
	res.render('products', {
		rutaCSS: 'products',
		rutaJS: 'products',
        products,
        info
	});
});

staticsRouter.get('/carts/:cid', (req, res) => {
    res.render('carts', {
        rutaCSS: 'carts',
        rutaJS: 'carts',
    });
});

staticsRouter.get('/login', (req, res) => {
    res.render('login', {
        rutaCSS: 'login',
        rutaJS: 'login',
    });
});

staticsRouter.get('/signin', (req, res) => {
    res.render('signin', {
        rutaCSS: 'signin',
        rutaJS: 'signin',
    });
});

staticsRouter.get('/profile', (req, res) => {
    res.render('profile', {
        rutaCSS: 'profile',
        rutaJS: 'profile',
    });
});

staticsRouter.get('/home', (req, res) => {
    res.render('home', {
        rutaCSS: 'home',
        rutaJS: 'home',
    });
});

export default staticsRouter;