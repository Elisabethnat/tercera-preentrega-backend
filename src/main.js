import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import { configureSocket } from './socket.js';
import { __dirname } from './path.js';
import path from 'path';
import MongoStore from 'connect-mongo';
import mongoConnect from './dataBase.js';
import passport from 'passport';
import initializePassport from './config/passport.js';
import staticsRouter from './router/statics.routes.js';
import router from './router/main.routes.js';
import cors from 'cors';
// import { userModel } from './models/users.model.js';

const whiteList = ['http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) != -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Acceso dengado'));
        };
    }   
};

const app = express();
const PORT = 4000;
//conexion a atlas
mongoConnect();
//Server
const server = app.listen(PORT, ()=>{
    console.log(`Servidor Express Puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

//Conexion a Socket
configureSocket(server)

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.urlencoded({extended: true}));
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL, 
        ttl: 200 
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,//estaban en false
    saveUninitialized: true
}));

app.engine('handlebars', engine()); 
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views')); 

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false   
}));

initializePassport(); 
app.use(passport.initialize()); 
app.use(passport.session()); 

//Routes
app.use('/static', express.static (path.join(__dirname, '/public')), staticsRouter);
app.use('/', router);


app.get('/*',(req,res)=>{   
    res.send("Error 404: Page not found");
});
