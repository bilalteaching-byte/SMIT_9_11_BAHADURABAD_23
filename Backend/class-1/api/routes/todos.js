import express from 'express'
import Todo from '../models/todo.js'

const todoRoutes = express.Router()

todoRoutes.get('/', async (req, res) => {
  const todos = await Todo.find().populate('createdBy' , "name email")
  res.send({ data: todos, error: false, status: 200 })
})

todoRoutes.post('/', async (req, res) => {
  const { body } = req
  try {
    const todo = await Todo.create(body)
    res.status(201).send({ status: 201, data: todo, error: false })
  } catch (err) {
    res
      .status(400)
      .send({ status: 400, data: null, error: true, errorMsg: err.message })
  }
})

export default todoRoutes
