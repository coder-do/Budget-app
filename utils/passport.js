import passport from 'passport';
import User from '../models/user.js';

export const jwtCallback = (jwt_payload, done) => {
    User.findOne({ email: jwt_payload.email })
        .then((user) => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
}

export const auth = passport.authenticate('jwt', { session: true });