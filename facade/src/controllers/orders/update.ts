import { Request, Response, NextFunction }  from 'express';
import { Order as OrderModel } from '../../model/orders.model';
import ApiError from '../../error/ApiError';

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { params: { id: orderId } } = req;
    const {
      body
  } = req;
    const response = await OrderModel.findByIdAndUpdate(orderId, body)
    res.status(200).send(response);
  } catch (error) {
    next(ApiError.badRequest(error.message))
    
  }
}

export default updateOrder;