import express from "express"

const app = express();
const PORT = 3000;

//middleware
app.use(express.json());


app.get("/test", (req, res) => {
    res.send({ data: { name: "Bilal" }, error: false, status: 200 })
})
app.post("/test", (req, res) => {
    res.send("Post Request")
})
app.put("/test", (req, res) => {
    res.send("PUT Request")
})
app.delete("/test", (req, res) => {
    res.send("Delete Request")
})

// Home route
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});