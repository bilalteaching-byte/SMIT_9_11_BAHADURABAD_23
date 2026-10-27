import express from 'express'
import 'dotenv/config';
import mongoose from 'mongoose';

import testRoutes from './routes/test.js'
import userRoutes from './routes/users.js'

const app = express()
const PORT = process.env.PORT || 3000


//middleware
app.use(express.json())

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

// Home route
app.get('/', (req, res) => {
  res.send('Server is running')
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
