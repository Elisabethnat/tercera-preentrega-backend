import jwt  from "jsonwebtoken";
 import 'dotenv/config';

 export const generateToken = (user) => {
    
   
    const token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn:'12h' });
    return token;
};


//Compruebo autenticación
export const authToken = (req, res, next) => {
    //consulto el header
    const authHeader=req.headers.authorization // consulto si existe el token
    if (!authHeader){
        return res.status(401).send({error: 'Usuario no autenticado'})
    };

    const token = authHeader.split(' ')[1]; 
    jwt.sign(token, process.env.JWT_SECRET, (error, credentials) => {
        if(error) {
            return res.status(403).send({ error: 'Usuario no autorizado' })
        };
        //desifro el token
        req.user = credentials.user;
        next()
    });

};
 