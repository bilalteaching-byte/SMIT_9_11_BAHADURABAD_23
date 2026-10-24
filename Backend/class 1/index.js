import express from 'express'
import testRoutes from './routes/test.js'
import userRoutes from './routes/users.js'

const app = express()
const PORT = 3000

//middleware
app.use(express.json())

const auth = (req, res, next) => {
  console.log(req.headers)
  if (req.headers['test-auth'] && req.headers['test-auth'] == '123456') {
    next()
  } else {
    res.send('User not authorized')
  }
}

app.use('/test', testRoutes)
app.use('/user', auth, userRoutes)

// Home route
app.get('/', (req, res) => {
  res.send('Server is running')
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
