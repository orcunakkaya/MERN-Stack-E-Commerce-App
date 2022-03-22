import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    try{
        const user = await Users.create(req.body);
        res.status(201).json({user, token: genereteToken(user._id)})
    }catch(err){
        res.status(400).json({error: err});
    }
}

export const getUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await Users.findOne({ email })
        if(user.email === email && user.password === password){
            res.status(200).json({user, token: genereteToken(user._id)})
        }else{
            res.status(400).json({ error : "error"});
        }
    }catch(error){
        res.status(400).json({ error : "error"});
    }
}

export const getProfile = async (req, res) => {
    try{
        const user = await Users.findById(req.user.id)
        res.status(200).json(user)
    }catch(err){ 
        res.status(400).json({error: err})
    }
}

export const isUserAuth = async (req, res) => {
    try{
        const token = req.headers["x-access-token"];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findById(decoded.id)
        res.json({isLoggedIn: true})
    }catch(err){
        res.json({isLoggedIn: false})
    }
}


const genereteToken = (id) => {
    return jwt.sign({ id }, 'abc123', {
        expiresIn: '3d',
    })
}