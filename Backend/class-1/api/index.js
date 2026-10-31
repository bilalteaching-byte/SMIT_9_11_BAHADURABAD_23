import express from 'express'
import { readFileSync } from 'fs'
import 'dotenv/config';
import mongoose from 'mongoose';

import testRoutes from './routes/test.js'
import userRoutes from './routes/users.js'
import todoRoutes from './routes/todos.js';

const app = express()
const PORT = process.env.PORT || 3000


const homePage = readFileSync(new URL('./public/index.html', import.meta.url))

//middleware
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }
  next()
})

mongoose.connect(process.env.MONGODBURI).then(() => {
  console.log("DB Connected")
}).catch((err) => {
  console.log("DB Connection Error", err)
})


const auth = (req, res, next) => {
  console.log(req.headers)
  if (req.headers['test-auth'] && req.headers['test-auth'] == '123456') {
    next()
  } else {
    res.send('User not authorized')
  }
}

app.use('/test', testRoutes)
app.use('/user', userRoutes)
app.use('/todo', todoRoutes)

app.get('/', (req, res) => {
  res.type('html').send(homePage)
})

// Export for Vercel; listen only when running locally
export default app

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
}
