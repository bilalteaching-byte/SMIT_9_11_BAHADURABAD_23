import express from "express"
import User from "../models/user.js"

const userRoutes = express.Router()

userRoutes.get("/", async (req, res) => {
    const users = await User.find()
    res.send({ data: users, error: false, status: 200 })
})
userRoutes.post("/", (req, res) => {
    res.send("Post User Request")
})
userRoutes.put("/", (req, res) => {
    res.send("PUT User Request")
})
userRoutes.delete("/", (req, res) => {
    res.send("Delete User Request")
})

export default userRoutes