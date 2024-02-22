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

    app.listen(3000, () => {
        console.log('app running successfully on port 3000');
    })
}).catch((err) => {
    console.log('mongo db connection failed::: ', err);
})