import express from "express"

const testRoutes = express.Router()

testRoutes.get("/", (req, res) => {
    res.send({ data: { name: "Bilal" }, error: false, status: 200 })
})
testRoutes.post("/", (req, res) => {
    res.send("Post Request")
})
testRoutes.put("/", (req, res) => {
    res.send("PUT Request")
})
testRoutes.delete("/", (req, res) => {
    res.send("Delete Request")
})

export default testRoutes