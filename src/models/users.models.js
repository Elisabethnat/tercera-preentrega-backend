import { Schema, model } from "mongoose";
import cartModel from "./carts.models.js";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol:{
        type:String,
        default:'user'
    },
    age: {
        type: Number,
        required: true,
    },
    cart: {
        type: Schema.Types.ObjectId, 
            ref: 'carts'
    }
});

userSchema.pre('save', async function (next) {
    if(!this.cart) {
        try {
            const newCart = await cartModel.create({});//esto devuelve el id
            this.cart = newCart._id;
        } catch (error) {
            next(error);
        };
    } else {

    };
});

export const userModel = model('users', userSchema);
