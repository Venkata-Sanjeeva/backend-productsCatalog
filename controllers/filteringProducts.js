const Product = require("../models/filteringModel")
const path = require("path");

const documentation = (req, res) => {
    const docPath = path.join(__dirname, "../public/documentation.html");
    res.sendFile(docPath);
};


const hello = (req, res) => {
    res.send("<h1>Hello!<br>Welcome to Products Catalog!!!</h1>")
}

const showAllProducts = async (req, res) => {
    const allProducts = await Product.find({});
    res.status(200).json(allProducts);
}

const showProductsWithFilters = async (req, res) => {
    const queryObject = {}
    const {id, name, numericFilters, sort} = req.query;
    if(id) {
        queryObject.id = id;
    }
    if(name) {
        queryObject.name = {$regex: name, $options: "i"}
    }

    if(numericFilters) { 
        // /products?numericFilters=price>100
        // /products?numericFilters=rating>=5,price>=20
        const operatorMap = {
            ">": "$gt", // greater than
            ">=": "$gte", // greater than or equal to
            "=": "$e", // equal to
            "<": "$lt", // less than
            "<=": "$lte" // leass than or equal to
        }
        // numericFilter value = rating>=5,price>=20 => it is a string

        const regEx = /\b(<|>|>=|=|<|<=)\b/g // it is also got from stackover flow and don't overthink

        // understand the replace method and it is easy to understand
        // due to regex the replace method has the callback function
        // syntax of replace
        // string.replace(searchValue, newValue)
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`) // rating-$gte-5,price-$gte-20

        // console.log(filters);

        const options = ["price", "rating"]
        filters = filters.split(",").forEach(item => {
            const [field, operator, value] = item.split("-"); // it is a array destructuring technique
            if(options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) } // final output =>  price: { $gt: 17, $lt: 66 }
            }
        });
    }
    // console.log(queryObject)
    let result = Product.find(queryObject) // by using req.query will get url parameters as an object and mongoDB will deals with the filtering process according to the condition/url params object which we have passed in the find Method

    if(sort) {
        const sortList = sort.split(",").join(" "); // remember sortList is a string not an array for naming purpose we named it as the List
        result = result.sort(sortList);
    } else { // if sort is not given by the user
        result = result.sort("name");
    }

    const products = await result

    res.status(200).json({products, totalProducts: products.length})
}

module.exports = {
    hello,
    showAllProducts,
    documentation,
    showProductsWithFilters
}