import dotenv from "dotenv"

dotenv.config();

export const ENV = {
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV,
    SUPABASE_URL : process.env.SUPABASE_URL,
    SUPABASE_KEY : process.env.SUPABASE_KEY,
    JWT_SECRET : process.env.JWT_SECRET,
    FRONTEND_APP_URL : process.env.FRONTEND_APP_URL,
    OPENAI_API_KEY : process.env.OPENAI_API_KEY,
    REMOVE_BG_API_KEY : process.env.REMOVE_BG_API_KEY,
}