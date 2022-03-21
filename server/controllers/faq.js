import FAQ from '../models/faq.js';

const getFAQs = (req, res) => {
    FAQ.find()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(404).json(err);
        })
}

const updateFAQ = (req, res) => {
    FAQ.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.status(200).json({ message: 'FAQ updated!' });
        })
        .catch(() => {
            res.status(404).json({ message: 'Error occured' });
        })
}

export { getFAQs, updateFAQ }