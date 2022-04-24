import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Account = new Schema({
    _id: {
        type: String,
        unique: true,
    },
    userId: String,
    title: String,
    description: String,
    currency: String,
    amount: Number,
    transactions: Object
}, {
    timestamps: true,
});

export default mongoose.model('Account', Account, 'accounts');
