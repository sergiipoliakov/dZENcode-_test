import express from 'express';

import { 
  createClient, 
 } from '../controllers/clients';

const router = express.Router()


router.post('/clients', createClient);


export default router; 