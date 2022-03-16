import { users } from '../data/users.js';

export const findUser = (req) => users.filter(user => user._id === req.session.user._id)[0];
