import { users } from '../data/users.js';

export const getUserByEmail = email => users.find(user => user.email === email);