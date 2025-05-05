import { Request, Response, NextFunction }  from 'express';
import path from 'path';
import { Product as ProductModel } from '../../model/products.model';
import ApiError from '../../error/ApiError';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: {
        title,
        type,
        serialNumber = Math.floor(Math.random() * 10000),
        specification,
      } = {},
      body
    } = req;
      const { photo } = req?.files as any || {}
      const price = JSON.parse(body.price) 
      const guarantee = JSON.parse(body.guarantee)
      let fileName: string = ''
      if (photo) {
        fileName = photo.name
        photo.mv(path.resolve(__dirname, '../../', 'static', fileName))
      }
    const response = await ProductModel.create({
      title,
      serialNumber,
      specification,
      price,
      type,
      guarantee,
      photo: fileName
    })
    res.status(200).send(response);
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export default createOrder;