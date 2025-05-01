import { NextFunction, Request, Response } from 'express';
import { Product as ProductModel } from '../../model/products.model';
import ApiError from '../../error/ApiError';

const removeProduct = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { params: { id: productId } } = req;
    const response = await ProductModel.find({productId})

    res.status(200).send(response);
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }

}

export default removeProduct;
