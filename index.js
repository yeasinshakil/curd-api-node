const express = require('express')
const { default: mongoose } = require('mongoose')
const Product = require("./models/producs.model")
const dotenv = require('dotenv')
const productRoute = require('./routes/products.route')

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api/products", productRoute);

app.get('/', (req, res) => {
    res.send('Hello from code')
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