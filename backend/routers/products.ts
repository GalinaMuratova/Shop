import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import {IProduct} from "../types";
import Product from "../models/Product";
import {imagesUpload} from "../multer";

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
   try {
       if (req.query.category) {
           const products = await Product.find({category: req.query.category}).populate('user', 'displayName');
           return res.send(products);
       } else {
           const products = await Product.find().populate('user', 'displayName');
           return res.send(products);
       }
   } catch (e) {
       return res.sendStatus(500);
   }
});

productsRouter.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('user', 'displayName phone');
        if (!product) {
            return res.sendStatus(404);
        }
        return res.send(product);
    } catch {
        return res.sendStatus(500);
    }
});
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

productsRouter.delete('/:id', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const product = await Product.findOne({_id: req.params.id, user: user._id});

        if (!product) {
            return res.sendStatus(403);
        }
        await Product.deleteOne({_id: req.params.id});

        return res.sendStatus(204);
    } catch (e) {
        next(e);
    }
});


export default productsRouter;