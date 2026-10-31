import express from 'express'
import User from '../models/user.js'

const userRoutes = express.Router()

userRoutes.get('/', async (req, res) => {
  const users = await User.find()
  res.send({ data: users, error: false, status: 200 })
})

userRoutes.post('/', async (req, res) => {
  const { body } = req
  try {
    const user = await User.create(body)
    res.status(201).send({ status: 201, data: user, error: false })
  } catch (err) {
    res
      .status(400)
      .send({ status: 400, data: null, error: true, errorMsg: err.message })
  }
})

userRoutes.put('/:id', async (req, res) => {
  const { params, body } = req
  console.log(params, body)
  try {
    const user = await User.findByIdAndUpdate(
      params.id,
      { ...body },
      { new: true }
    ).exec()
    res.status(200).send({ status: 200, data: user, error: false })
  } catch (err) {
    res
      .status(400)
      .send({ status: 400, data: null, error: true, errorMsg: err.message })
  }
})

userRoutes.delete('/:id', async (req, res) => {
  const { params } = req
  try {
    const user = await User.findByIdAndDelete(params.id).exec()
    res.status(200).send({ status: 200, data: null, error: false })
  } catch (err) {
    res
      .status(400)
      .send({ status: 400, data: null, error: true, errorMsg: err.message })
  }
})

export default userRoutes




