import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
 