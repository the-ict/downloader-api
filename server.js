const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connect = require("./config/connectDb")
const path = require("path")
const mongoose = require("mongoose")

// routers
const queryRoute = require("./routers/Query")
const fileRoute = require("./routers/File")
const userRoute = require("./routers/User")

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// middleware section
app.use(express.static(path.join(__dirname, "images")))
app.use(express.json())
app.use(cors())


// routers section
app.get("/test", (req, res) => {
    console.log("test route is running")
    res.send("it works !")
})

app.get("/test-question", (req, res) => {
    console.log(req.query)
    const { user } = req.query
    res.send(user)
})

app.use("/api/query", queryRoute)
app.use("/api/file", fileRoute)
app.use('/api/user', userRoute)

mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));
mongoose.connection.once('open', () => console.log('MongoDB connected'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connect()
})
