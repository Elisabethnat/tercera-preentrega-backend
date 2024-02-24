import { Router } from "express";
import auth from "../auth.js";

const cookiesRouter = Router();

cookiesRouter.get('/setCookies', (req,res)=>{

    res.cookie('CookieCookie', 'Este es el valor de una cookie', {maxAge:60000, signed:true}).send('Cookie creada'); 
})

cookiesRouter.get('/getCookies', (req,res)=>{
    res.send(req.signedCookies); 

cookiesRouter.get('/session', (req,res)=>{
    if(req.session.counter){ 
    req.session.counter++
    res.send(`Entraste ${req.session.counter} veces a la página`)    
    
    }else { 
        req.session.counter = 1; 
        res.send("Hola por primera vez");
    }    
})

cookiesRouter.get('/login', (req,res)=>{
    const {email, password} = req.body;
/* esto es para el POSTMAN
    if (email === "admin@admin.com" && password === "1234"){
        req.session.email = email;
        req.session.password = password;
        console.log(email,password);
        }else { 
    "Usuario o contraseña incorrectas"  
    }
    return res.send("No se pudo iniciar sesión");
 */
    req.session.email = email;
    req.session.password = password

    return res.send("Usuario logueado");
})

cookiesRouter.get('/logout', (req,res)=>{
    req.session.destroy(()=>{
        res.send("Logout ok!");
    })
})

cookiesRouter.get('/admin', auth ,(req,res)=>{
    res.send("Sos admin")
})

export default cookiesRouter;