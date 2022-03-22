import Users from "../models/userModel.js";

export const orderProduct = async(req, res) => {
    try{
    const order = await Users.findById(req.user.id);
    order.orders.push(req.body)
    order.save();

    res.status(200).json({message: "Added"})
    }catch(err){
         res.status(400).json({error: err})
    }
}

export const addToFavorites = async(req, res) => {
    try{
        const product = req.body;
        const user = await Users.findById(req.user.id);
        const itemControl = await user.favoriteProducts.find(element => (
            element.id === product.id
        ));
        if(itemControl === undefined){
            user.favoriteProducts.push(product);
            user.save();
            res.json({icon: "success" ,message: "Product added to favorites"})
        }else{
            res.json({icon:"warn", message: "The product is already in favorites"})
        }
    }catch(err){
        res.status.json({error: err});
    }
}

export const deleteFavoriteProduct = async (req,res) => {
    try{
        const product = req.body;
        const user = await Users.findById(req.user.id);
        user.favoriteProducts.pull(product);
        user.save();
        res.status(200).json("success")
    }catch(err) {
        res.status(400).json("error")
    }
}