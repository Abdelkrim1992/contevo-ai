import { Pool } from 'pg'
import { ENV } from './env.js'

const pool = new Pool({
    database: ENV.DATABASE_NAME,
    user: ENV.DATABASE_USER,
    password: ENV.DATABASE_PASSWORD,
    host: ENV.DATABASE_HOST,
    port: ENV.DATABASE_PORT,
})

pool.on('connect', () => {
    console.log('connected to the database')
})
pool.on('error', (err) => {
    console.error('Error connecting to the database', err)
})

export default pool;
