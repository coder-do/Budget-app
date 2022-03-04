import express from 'express'
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import faqRouter from './routes/faq.js';

const app = express()

app.use(express.json())

app.use('/users', userRouter)

app.use('/auth', authRouter)

app.use('/faq', faqRouter)

app.listen(3000)