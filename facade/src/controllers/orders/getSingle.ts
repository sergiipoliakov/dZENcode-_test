import { NextFunction, Request, Response }  from 'express';
import { Order as OrderModel } from '../../model/orders.model';
import ApiError from '../../error/ApiError';

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params: { id: orderId } } = req;
    const response = await OrderModel.findById(orderId).populate('products.productId');

    res.status(200).send(response);
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }

}

export default getOrder;
