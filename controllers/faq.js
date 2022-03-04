import { questions } from '../data/faq.js';

const getFAQs = (req, res) => {
    res.status(200).json(questions)
}

const updateFAQ = (req, res) => {
    try {
        const id = +req.params.id;
        const faqData = req.body;
        const newData = questions.filter(el => el.id === id);

        if (newData.length === 0) {
            throw new Error(`Question with ${id} id isn't in database`)
        }

        questions.map(item => {
            if (item.id === id) {
                item.question = faqData.question;
                item.answer = faqData.answer;
            }
        })

        res.status(200).json({ message: 'FAQ was updated' })
    } catch (e) {
        res.status(404).json({ message: 'Error!', err: e.message })
    }
}

export { getFAQs, updateFAQ }