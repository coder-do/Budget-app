import passport from 'passport';
import User from '../models/user.js';

export const jwtCallback = (jwt_payload, done) => {
    User.findOne({ email: jwt_payload.email })
        .then((user) => {
            return done(null, user || false);
        })
}

export const auth = passport.authenticate('jwt', { session: true });