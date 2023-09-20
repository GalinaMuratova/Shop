import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import usersRouter from "./routers/users";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);


const run = async ()=> {
    await mongoose.connect('mongodb://localhost/forum');

    app.listen(port, () => {
        console.log('Server started on 8000 port')
    });
    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(e => console.error(e));
