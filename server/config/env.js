import dotenv from "dotenv"

dotenv.config();

export const ENV = {
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV,
    DATABASE_NAME : process.env.DATABASE_NAME,
    DATABASE_USER : process.env.DATABASE_USER,
    DATABASE_PASSWORD : process.env.DATABASE_PASSWORD,
    DATABASE_HOST : process.env.DATABASE_HOST,
    DATABASE_PORT : process.env.DATABASE_PORT,
    JWT_SECRET : process.env.JWT_SECRET,
    FRONTEND_APP_URL : process.env.FRONTEND_APP_URL,
}