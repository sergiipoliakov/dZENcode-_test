import { NextFunction, Request, Response }  from 'express';
import { Order as OrderModel } from '../../model/orders.model';
import ApiError from '../../error/ApiError';

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await OrderModel.find().populate('products', 'price')
    res.status(200).send(response);
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }

}

export default getOrders;
