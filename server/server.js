// Importing the required modules

import express from 'express'
import cors from 'cors'
import { clerkMiddleware } from '@clerk/express'
import { requireAuth } from '@clerk/express'
import { ENV } from './config/env.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())  
app.use(requireAuth())


app.get('/', (req, res) =>{
    res.send('Hello World')
})

const Port = ENV.PORT || 5001;

app.listen(Port , () =>{
    console.log('Server is running on port', Port)
})

