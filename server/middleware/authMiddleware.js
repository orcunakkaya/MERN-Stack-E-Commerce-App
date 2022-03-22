import jwt from 'jsonwebtoken';
import Users from '../models/userModel.js';

const validateToken = async (req, res, next) => {
    if(req.headers['authorization'] && req.headers['authorization'] !== []){
        try{
            const token = req.headers['authorization'];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await Users.findById(decoded.id);
            next();
        }catch(err){
            res.status(401).json({error: err});
        }
    }else{
        res.status(401).json({error: "error"});
    }
    
}

export default validateToken;