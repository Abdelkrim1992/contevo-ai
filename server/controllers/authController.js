import bcrypt from 'bcrypt'
import supabase from '../config/db.js'
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
            const { data, error } = await supabase
                .from('users')
                .insert([{ fullName, email, password: hashedPassword }])
                .select()
            
            if (error) throw error;

            const newUser = data[0]
            
            // Generate token for the new user
            const token = generateToken(res, newUser.id)
            
            return res.json({
                success: true,
                message: 'User registered successfully',
                user: newUser,
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
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)

            if (error) throw error;

            if(!data || data.length === 0) {
                return res.status(401).json({
                    success: false,
                    message : 'Invalid credentials'
                })
            }
            const foundUser = data[0]
            const isPasswordValid = await bcrypt.compare(password, foundUser.password)
            if(!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message : 'Invalid credentials'
                })
            }
            const token = generateToken(res, foundUser.id)
            return res.json({
                success: true,
                message : 'User signed in successfully',
                user : foundUser,
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