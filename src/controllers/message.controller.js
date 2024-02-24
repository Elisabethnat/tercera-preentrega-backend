import messageModel from "../models/messages.models.js";

const getMessages = async (req, res) => {
    try {   
        const messages = await messageModel.find();
        res.status(200).send({ resultado: 'OK', message: messages});
    } catch (error) {
        res.status(400).send({ resultado: 'Error al consultar mensaje', message: error});  
    };
}; 

const postMessages = async (req, res) => {
    const { email, message } = req.body;
    try {   
        const respuesta = await messageModel.create({
            email,
			message,
        });
        res.status(200).send({ resultado: 'OK', message: respuesta});
    } catch (error) {
        res.status(400).send({ resultado: 'Error al consultar mensaje', message: error});  
    };
}; 

const messagesController = {
    getMessages,
    postMessages,
};

export default messagesController;