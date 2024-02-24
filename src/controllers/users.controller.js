import { userModel } from "../models/users.model.js";

export const userGet = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send('Error al consultar usuario: ', e);        
    };
};


const usersController = { 
    userGet, 
};

export default usersController;