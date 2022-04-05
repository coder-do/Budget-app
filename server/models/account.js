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
                title: String,
                category: Array,
                description: String,
                amount: Number,
                payment_date: String,
                payee: String,
                type: String,
                createdAt: String,
                updatedAt: String,
            }
        ],
        expense: [
            {
                _id: String,
                title: String,
                category: Array,
                description: String,
                amount: Number,
                payment_date: String,
                payee: String,
                type: String,
                createdAt: String,
                updatedAt: String,
            }
        ],
    }
}, {
    timestamps: true,
});

export default mongoose.model('Account', Account, 'accounts');