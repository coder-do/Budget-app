import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FAQ = new Schema({
    _id: String,
    question: String,
    answer: String
}, {
    timestamps: true,
});

export default mongoose.model('FAQ', FAQ, 'faq');