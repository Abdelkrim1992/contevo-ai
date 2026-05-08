import supabase from '../config/db.js'

const UserController = () => {

    const getUserProfile = async (req,res) => {
        try {
            const userId = req.user
            
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)

            if (error) throw error;

            if(!data || data.length === 0) {
                return res.status(404).json({
                    message : 'User not found'
                })
            }
            return res.status(200).json({
                message : 'Get user profile fetched successfully',
            })
        } catch (error) {
            console.error('Database error:', error)
            return res.status(500).json({
                message : 'Internal server error',
                error : error.message
            })
        }
    }

    const updateUserProfile = async (req,res) => {
        try {
            const userId = req.user
            const { fullName, email } = req.body
            if(!fullName || !email) {
                return res.status(400).json({
                    message : 'All fields are required'
                })
            }
            
            const { data, error } = await supabase
                .from('users')
                .update({ fullName, email })
                .eq('id', userId)
                .select()
            
            console.log('updateUser result:', data) // Debug log
            
            if (error) throw error;
            
            if(!data || data.length === 0) {
                return res.status(404).json({
                    message : 'User not found'
                })
            }
            
            return res.status(200).json({
                message : 'User profile updated successfully',
                user : data[0]
            })
        } catch (error) {
            console.error('Database error:', error)
            return res.status(500).json({
                message : 'Internal server error',
                error : error.message
            })
        }
    }

    return {
        getUserProfile,
        updateUserProfile
    }
}

export default UserController;