import jwt from 'jsonwebtoken'
import { ENV } from '../config/env.js';

export const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn : '30d'});
    res.cookie('jwt', token , {
        httpOnly : true,
        secure : ENV.NODE_ENV !== 'development',
        maxAge : 30 * 24 * 60 * 60 * 1000,
        sameSite : 'strict',
    })
    return token;
}

export const removeToken = (res) =>{
    res.cookie('jwt', '', {
        httpOnly : true,
        expires : new Date(0),
        sameSite : 'strict',
    })
}