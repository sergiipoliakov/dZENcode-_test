import express from 'express';

import { 
  getAllOrders, 
  createOrder, 
  getOrder, 
  updateOrder,
  addProductToOrder,
  removeOrder
 } from '../controllers/orders';

const router = express.Router()

router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrder);

router.post('/orders', createOrder);

router.put('/orders/:id', addProductToOrder);

router.delete('/orders/:id', removeOrder);

export default router; 