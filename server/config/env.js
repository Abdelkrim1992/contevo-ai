import "dotenv/config"

export const ENV = {
    PORT : process.env.PORT,
    DATABASE_URL : process.env.DATABASE_URL,
    CLERK_SECRET_KEY : process.env.CLERK_SECRET_KEY,
    CLERK_FRONTEND_API : process.env.CLERK_FRONTEND_API,
    CLERK_SECRET_KEY : process.env.CLERK_SECRET_KEY,
    NODE_ENV : process.env.NODE_ENV,
}