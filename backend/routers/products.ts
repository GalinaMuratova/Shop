import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import {IProduct} from "../types";
import Product from "../models/Product";
import {imagesUpload} from "../multer";

const productsRouter = express.Router();

productsRouter.post('/', auth,  imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }
        const productData: IProduct = {
            user: user._id,
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.file.filename
        };

        const product= new Product(productData);
        await product.save();

        return res.send(product);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

export default productsRouter;