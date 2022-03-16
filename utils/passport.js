import passport from 'passport';
import { getUserByEmail } from './loginHelpers.js';

export const jwtCallback = (jwt_payload, done) => {
    const user = getUserByEmail(jwt_payload.email);
    if (user) {
        return done(null, user);
    }
    return done(null, false);
}

export const auth = passport.authenticate('jwt', { session: true });