import { NextFunction, Request, Response } from 'express';
import { Order as OrderModel } from '../../model/orders.model';
import ApiError from '../../error/ApiError';

const removeProduct = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { params: { id: orderId } } = req;
    await OrderModel.findByIdAndDelete(orderId)

    res.status(201).send(true);
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }

}

export default removeProduct;
