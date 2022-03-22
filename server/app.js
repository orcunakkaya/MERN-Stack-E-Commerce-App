import express from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({ extended: true }));


app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/profile', profileRoutes);

mongoose.connect(
        process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log('Sunucu çalıştırıldı...');
    })
}).catch((err) => {
    console.log(err.message);
})