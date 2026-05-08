import jwt from 'jsonwebtoken'
import { ENV } from '../config/env.js';

export const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn : '30d'});
    res.cookie('jwt', token , {
        httpOnly : true,
        secure : true, // Must be true for sameSite: 'none'
        maxAge : 30 * 24 * 60 * 60 * 1000,
        sameSite : 'none', // Allow cross-site cookies
    })
    return token;
}

export const removeToken = (res) =>{
    res.cookie('jwt', '', {
        httpOnly : true,
        secure: true,
        expires : new Date(0),
        sameSite : 'none',
    })
}