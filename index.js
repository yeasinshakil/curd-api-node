const express = require('express')
const { default: mongoose } = require('mongoose')
const Product = require("./models/producs.model")
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello from code')
})

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.send(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.send(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.put('/api/product/:id', async (req, res) => {
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
})

app.post('/api/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.connect(process.env.MONGO_CONNECTION_URI).then(() => {
    console.log('connent to the database');

    try {
        app.listen(8000, () => {
            console.log('app running successfully on port 8000');
        })

    } catch (error) {
        console.log('port running failed:::: ', error);
    }
}).catch((err) => {
    console.log('mongo db connection failed::: ', err);
})