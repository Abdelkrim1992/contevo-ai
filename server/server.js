// Importing the required modules

import express from 'express'
import cors from 'cors'
import { ENV } from './config/env.js'
import cookieParser from 'cookie-parser'
import AuthRouter from './routers/authRoutes.js'
import UserRouter from './routers/userRoutes.js'

const app = express()
app.use(cors({
    origin : ENV.FRONTEND_APP_URL,
    credentials : true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended : true}))


//routes
app.use('/auth', AuthRouter)
app.use('/user', UserRouter)

//test route
app.get('/', async (req, res) =>{
    res.send('Hello World')
})

const Port = ENV.PORT;

app.listen(Port , () =>{
    console.log('Server is running on port', Port)
})

