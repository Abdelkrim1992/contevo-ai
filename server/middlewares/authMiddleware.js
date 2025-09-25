import jwt from 'jsonwebtoken'

const protect = async (req, res, next) => {
    const token = req.cookies.jwt
    if(!token) {
        return res.status(401).json({
            message : 'Unauthorized, token is missing'
        })
    }
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decoded.userId
        next()
    } catch (error) {
        return res.status(401).json({
            message : 'Unauthorized, invalid token'
        })
    }
}

export default protect;