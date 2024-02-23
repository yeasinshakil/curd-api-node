const Product = require("../models/producs.model")

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.send(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.send(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const productAdd = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const productUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) return res.status(400).json({ message: 'Product not found' })
        const updatedProduct = await Product.findById(id)
        res.send(updatedProduct)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const productDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id)
        if (!product) return res.status(400).json({ message: 'Product not found' })
        res.send(req.body)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    getProducts, getSingleProduct, productAdd, productUpdate, productDelete
}