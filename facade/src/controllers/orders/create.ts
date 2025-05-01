import { Request, Response, NextFunction }  from 'express';
import { Order as OrderModel } from '../../model/orders.model';
import ApiError from '../../error/ApiError';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body
  } = req;
    const response = await OrderModel.create(body)
    res.status(200).send(response);
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export default createOrder;