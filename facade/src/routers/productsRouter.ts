import express from "express";
import { getAllProducts, createProduct, removeProduct } from '../controllers/products'

const router = express.Router()


router.get('/products', getAllProducts)
// router.get('/products/:id')
router.post('/products', createProduct)
router.delete('/products/:id', removeProduct)

export default router;