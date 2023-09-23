import mongoose, {Schema} from "mongoose";
import {CATEGORIES} from "../constants";
import User from "./User";

const ProductSchema = new Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
            message: 'User doesnt exist',
        }
    },
    category: {
      type: String,
      required: true,
       validate: {
            validator: async (value: string) => CATEGORIES.includes(value),
            message: 'Category doesnt exist',
        }
    },
    title: {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
        min: [1, 'Too few']
    },
    description : String,
    image: String
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;