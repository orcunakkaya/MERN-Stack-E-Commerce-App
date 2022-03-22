import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        generalCategory: {
            type: String,
            required: true
        },
        detailedCategory: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        descriptionImages: {
            type: [String],
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: Object,
            required: true
        }
    }
)

const Products = mongoose.model("Products", productSchema);

export default Products;