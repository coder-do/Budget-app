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
    transactions: {
        income: [
            {
                _id: String,
                category: Array,
                description: String,
                amount: Number,
                payment_date: String,
                createdAt: String,
                updatedAt: String,
            }
        ],
        expense: [
            {
                _id: String,
                category: Array,
                description: String,
                amount: Number,
                payment_date: String,
                createdAt: String,
                updatedAt: String,
            }
        ],
    }
}, {
    timestamps: true,
});

export default mongoose.model('Account', Account, 'accounts');
