import jwt from 'jsonwebtoken'

export const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn : '30d'});
    res.cookie('jwt', token , {
        httpOnly : true,
        secure : process.env.NODE_ENV !== 'development',
        maxAge : 30 * 24 * 60 * 60 * 1000,
        sameSite : 'strict',
    })
    return token; // Return the token so it can be sent in response
}

export const removeToken = (res) =>{
    res.cookie('jwt', '', {
        httpOnly : true,
        expires : new Date(0),
        sameSite : 'strict',
    })
}