import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        dateCreated: {
            type: Date,
            default: Date.now
        },
        orders: {
            type: Array
        },
        favoriteProducts: {
            type: Array
        }
    }
)

const Users = mongoose.model('Users', userSchema);

export default Users;