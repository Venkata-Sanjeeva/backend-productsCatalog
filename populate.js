require("dotenv").config()

const connectDB = require("./db/connect")

const exProducts = require("./models/filteringModel")

const jsonProducts = require("./data/products")

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await exProducts.deleteMany(); // this will erase all the products data before you upload the raw data into your dataBase
        await exProducts.create(jsonProducts)
        console.log("Connected Successfully");
        process.exit(0) // will stop this file running until it reaches this line it's like return keyword and the process is a global variable
        // 0 indicates to stop 
    } catch (error) {
        console.log(error);
        process.exit(1) // whereas 1 indicates to continue this execution
    }
}

start();