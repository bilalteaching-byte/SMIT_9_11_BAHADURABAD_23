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

todoRoutes.put('/:id', async (req, res) => {
  const { params, body } = req
  try {
    const existing = await Todo.findById(params.id)
    if (!existing) {
      return res
        .status(404)
        .send({ status: 404, data: null, error: true, errorMsg: 'Post not found' })
    }
    if (!body.userId || String(existing.createdBy) !== String(body.userId)) {
      return res.status(403).send({
        status: 403,
        data: null,
        error: true,
        errorMsg: 'You can only update your own post'
      })
    }
    const todo = await Todo.findByIdAndUpdate(
      params.id,
      { title: body.title },
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'name email')
      .exec()
    res.status(200).send({ status: 200, data: todo, error: false })
  } catch (err) {
    res
      .status(400)
      .send({ status: 400, data: null, error: true, errorMsg: err.message })
  }
})

export default todoRoutes
