import 'dotenv/config.js';
import mongoose from 'mongoose';

export default function mongoConnect() {
    mongoose.connect(process.env.MONGO_URL)
    .then(async ()=>{
        console.log("DB conectada");
    })
    .catch((e)=> console.log("Error en conecxion a Mongo Atlas", e));
}