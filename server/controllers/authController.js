import bcrypt from 'bcrypt'
import pool from '../config/db.js'
import { generateToken, removeToken } from '../utils/configureToken.js'


const AuthController = () => {

    const signup = async (req, res) => {
        const { fullName, email, password } = req.body
        
        if(!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await pool.query(
                'INSERT INTO users (fullName, email, password) VALUES($1, $2, $3) RETURNING *',
                [fullName, email, hashedPassword]
            )
            
            // Generate token for the new user
            const token = generateToken(res, user.rows[0].id)
            
            return res.json({
                success: true,
                message: 'User registered successfully',
                user: user.rows[0],
                token: token
            })
        } catch (error) {
            console.error('Database error:', error)
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            })
        }
    }

    const signin = async (req, res) =>{
        const { email, password } = req.body
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message : 'All fields are required'
            })
        }

        try {
            const user = await pool.query(
                'SELECT * FROM users WHERE email = $1', [email]
            )
            if(user.rows.length === 0) {
                return res.status(401).json({
                    success: false,
                    message : 'Invalid credentials'
                })
            }
            const isPasswordValid = await bcrypt.compare(password, user.rows[0].password)
            if(!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message : 'Invalid credentials'
                })
            }
            const token = generateToken(res, user.rows[0].id)
            return res.json({
                success: true,
                message : 'User signed in successfully',
                user : user.rows[0],
                token: token
            })
        } catch (error) {
            console.error('Database error:', error)
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            })
        }
    }

    const signout = async(res) => {
        removeToken(res)
        return res.status(200).json({
            success: true,
            message : 'User signed out successfully'
        })
    }
    
    return {
        signup,
        signin,
        signout
    }
}

export default AuthController;