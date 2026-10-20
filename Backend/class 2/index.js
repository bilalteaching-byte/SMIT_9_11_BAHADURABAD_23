import express from "express"

const app = express()
const port = 5000

app.use(express.json())

// method: GET, POST, PUT, PATCH, DELETE

app.get("/", (req, res) => {
    // res.send("abc")
    res.json({ method: "GET" })
    console.log(req.query.roll_number)
})

// req.query >> ?rollnumber=1&name=Huzaifa
// ?page=2&limit=50
// req.params >> /24
// req.body >> {"name": "Huzaifa", RollNumber: 24}

app.get("/student", (req, res) => {
    // res.send("abc")
    res.send("Student API Call...")
    console.log(req.query.abc)
    console.log(req.query.def)
})
app.get("/student/:id", (req, res) => {
    const roll_number = req.params.id
    const {id} = req.params
    res.send(roll_number)
})

app.post("/", (req, res) => {

    const payload = req.body 
    // console.log(payload)
    // res.json(payload)
    res.status(200).json(payload)

})

app.put("/", (req, res) => {
    res.json({ method: "PUT" })
})

app.delete("/", (req, res) => {
    res.json({ method: "DELETE" })
})

app.listen(port, () => {
    console.log("server is running...")
})
