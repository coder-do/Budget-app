import cors from 'cors';
import express from 'express'
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import faqRouter from './routes/faq.js';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import incomeRouter from './routes/income.js';
import expenseRouter from './routes/expense.js';
import accountsRouter from './routes/account.js';
import categoriesRouter from './routes/categories.js'
import { config } from 'dotenv';
import { jwtCallback } from './utils/passport.js';
import { ExtractJwt, Strategy } from 'passport-jwt';

config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

const app = express();

passport.use(new Strategy(opts, jwtCallback));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 3600000
    }
}))

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use('/faq', faqRouter);

app.use('/auth', authRouter);

app.use('/users', userRouter);

app.use('/incomes', incomeRouter);

app.use('/expenses', expenseRouter);

app.use('/accounts', accountsRouter);

app.use('/categories', categoriesRouter);

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        if (process.env.NODE_ENV !== 'test') {
            app.listen(process.env.PORT);
        }
    })
    .catch(err => new Error(err));

export { app };