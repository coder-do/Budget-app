import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
    _id: String,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    gender: String,
    country: String,
    dateOfBirth: String,
    age: Number,
    role: String,
    transactions: Object,
    accounts: Array
}, {
    timestamps: true,
});

export default mongoose.model('User', User, 'users');