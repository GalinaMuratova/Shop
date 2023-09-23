import mongoose from "mongoose";

export interface IUser {
    username: string,
    password: string,
    displayName: string,
    phone: string,
    token: string
}

export interface IProduct {
    category: string,
    title:string,
    description: string,
    price:number,
    image: string,
    user: mongoose.Types.ObjectId
}