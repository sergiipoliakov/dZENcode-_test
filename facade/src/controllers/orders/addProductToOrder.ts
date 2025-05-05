import { NextFunction, Request, Response } from 'express';
import { Order as OrderModel } from '../../model/orders.model';
import { Product as ProductModel } from '../../model/products.model';
import ApiError from '../../error/ApiError';

const addProductToOrder = async (req: Request, res: Response, next: NextFunction) => {
  const session = await OrderModel.startSession();
  session.startTransaction();
  try {
    const { params: { id: orderId } } = req;
    const {
      body: {
        productId,
      } = {}
    } = req;
    const order = await OrderModel.findById(orderId).session(session);
    if (!order) {
      return next(ApiError.badRequest('Order not found'))
    }

    const product: any = await ProductModel.findById(productId).session(session);
    if (!product) {
      return next(ApiError.badRequest('Product not found'))
    }
    const alreadyExists = order.products.some(p => p.toString() === productId.toString());
    if (alreadyExists) {
      return next(ApiError.badRequest('This product already exists in the order'))
    }

    const resoult = await OrderModel.findOneAndUpdate(
      { _id: orderId },
      { $push: { products: productId } },
      { new: true }
    )

    await ProductModel.findByIdAndUpdate(productId, { order: orderId });
    res.status(200).send(resoult);
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export default addProductToOrder;