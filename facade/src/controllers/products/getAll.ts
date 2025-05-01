import { NextFunction, Request, Response }  from 'express';
import { Product as ProductModel } from '../../model/products.model';
import ApiError from '../../error/ApiError';

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.query;
    const response = await ProductModel.find({...(type ? { type } : {} )}).populate('order', 'title').exec()
    res.status(200).send(response);
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export default getAllProducts;
