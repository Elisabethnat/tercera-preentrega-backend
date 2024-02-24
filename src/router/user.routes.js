import { Router } from "express";
import usersController from "../controllers/users.controller.js";

const userRouter = Router();
//Ruta para obtener usuarios
userRouter.get('/', usersController.userGet);
  
export default userRouter;

// import { createHash  } from "../utils/bcrypt.js";
//   const { first_name, last_name, age, password, email} = req.body;

//   try {
//       const hashPasword = createHash(password) //introduzco el bcrypt 
//       const resultado = await userModel.create({
//           first_name, last_name, age, password: hashPasword, email
//       });
//       res.status(200).send({mensaje:"Usuario creado", respuesta: resultado });
      
//   } catch (error) {
//       res.status(400).send({error: `Error al crear usuario: ${error}` });          
//   };