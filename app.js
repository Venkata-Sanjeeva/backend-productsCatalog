const express = require("express")
const router = require("./routes/filter")
require("dotenv").config();
const cors = require("cors")
// always run populate.js file separately with command
const connectDB = require("./db/connect")


const app = express();

app.use(cors());
app.use("/api", router)
app.use(express.static("public"));


const start = async () => {
    const port = 3000
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
        console.log(`Server is Listening at ${port}!`)
    })
}

start();