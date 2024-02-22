const express = require('express')
const { default: mongoose } = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.get('/', (req, res) => {
    res.send('Hello from code')
})


mongoose.connect(process.env.MONGO_CONNECTION_URI).then(() => {
    console.log('connent to the database');

    app.listen(3000, () => {
        console.log('app running successfully on port 3000');
    })
}).catch((err) => {
    console.log('mongo db connection failed::: ', err);
})