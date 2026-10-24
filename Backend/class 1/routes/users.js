import express from "express"

const userRoutes = express.Router()

userRoutes.get("/", (req, res) => {
    res.send({ data: { name: "User" }, error: false, status: 200 })
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