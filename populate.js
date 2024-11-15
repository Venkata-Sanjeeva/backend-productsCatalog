require("dotenv").config();

const connectDB = require("./db/connect");
const dbProducts = require("./models/filteringModel");
const axios = require("axios");

async function getData() {
  const data = await axios.get("https://supersimplebackend.dev/products").then(res => res.data);
  return data;
}

async function structureTheData() {
  const data = await getData();
  const transformedData = data.map(item => ({
    id: item.id,
    image: item.image,
    name: item.name,
    rating: item.rating.stars,
    price: item.priceCents / 100,
  }));
  return transformedData;
}

const start = async () => {
  try {
    const jsonProducts = await structureTheData();  // Awaiting transformed data here
    await connectDB(process.env.MONGO_URI);
    await dbProducts.deleteMany(); // Erase all existing products
    await dbProducts.create(jsonProducts); // Insert new products
    console.log("Connected Successfully");
    process.exit(0); // Stop execution
  } catch (error) {
    console.log(error);
    process.exit(1); // Continue execution with error
  }
};

start();
