const express = require('express')
const router = express.Router()
const Product = require('../models/producs.model')
const { getProducts, getSingleProduct, productAdd, productUpdate, productDelete } = require('../controllers/product.controller')

router.get('/', getProducts)
router.post('/', productAdd)
router.get('/:id', getSingleProduct)
router.put('/:id', productUpdate)
router.delete('/:id', productDelete)



module.exports = router 
