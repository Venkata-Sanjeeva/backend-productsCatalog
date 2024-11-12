const express = require("express")

const { hello, showAllProducts, showProductsWithFilters, documentation } = require("../controllers/filteringProducts")

const router = express.Router();

router.route("/hello").get(hello)
router.route("/products").get(showAllProducts)
router.route("/products/filter").get(showProductsWithFilters)
router.route("/documentation").get(documentation)

module.exports = router