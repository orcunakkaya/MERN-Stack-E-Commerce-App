import Products from "../models/productModel.js";
import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

export const createProduct = async(req, res) => {
    try{
        const product = await Products.create(req.body);
        res.status(201).json({message: 'Product başarılı bir şekilde oluşturuldu', product: product})
    }catch(err){
        res.status(400).json({error: err});
    }
}

export const getProducts = async(req, res) => {
    const { product_category: _product_category } = req.params;
    try{
        if(_product_category === "iPhone" || _product_category === "Mac" || _product_category === "iPad" || _product_category === "Watch"){
            const product = await Products.find({generalCategory: _product_category});
            res.status(200).json(product);
        }else{
            const product = await Products.find({detailedCategory: _product_category});
            res.status(200).json(product);
        }
    }catch(err){
        res.status(404).json({error: err})
    }
}

export const getSingleProduct = async(req, res) => {
    const { id: _id }  = req.params;
    try{
        const product = await Products.find({ _id: _id });
        res.status(200).json(product);
    }catch(err){
        res.status(404).json({error: err});
    }
}