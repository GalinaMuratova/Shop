import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import * as crypto from "crypto";
import Product from "./models/Product";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('products')
    } catch (e) {
        console.log('Collection not deleted')
    }
    const [user1, user2] = await User.create({
        username: 'Anna',
        password:'123',
        displayName:'Anna Indiana',
        phone:'0556 89 56 23',
        token:crypto.randomUUID()
    }, {
        username: 'Bob',
        password:'456',
        displayName:'Bob Ross',
        phone:'+998 56 56 78',
        token:crypto.randomUUID()
    });
    await Product.create({
        user: user1._id,
        category: 'Books',
        description:'Интересная книга на пару вечеров',
        title: 'Герман Гессе - Степной волк',
        price: 420,
        image:'german.jpg'
    }, {
        user: user1._id,
        category: 'Cosmetics',
        description:'Прекрасного натурального оттенка',
        title: 'Румяна',
        price: 420,
        image:'blush.jpg'
    }, {
        user: user2._id,
        category: 'Clothing',
        description:'Футболки лучшего качества',
        title: 'Футболки с котиками',
        price: 420,
        image:'t-shirt.jpg'
    },{
        user: user2._id,
        category: 'Computers',
        description:'Самый мощный игровой ноутбук',
        title: 'Ноутбук',
        price: 100020,
        image:'laptop.jpg'
    })
    await db.close();
};

run().catch(console.error);