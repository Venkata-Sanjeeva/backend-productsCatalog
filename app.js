const express = require("express")
const router = require("./routes/filter")
require("dotenv").config();
// always run populate.js file separately with command
const connectDB = require("./db/connect")

const app = express();

app.use("/api", router)
app.use(express.static("public"));


const start = async () => {
    await connectDB(process.env.MONGO_URI)
    app.listen(5000, () => {
        console.log("Server is Listening at 5000!")
    })
}

start();