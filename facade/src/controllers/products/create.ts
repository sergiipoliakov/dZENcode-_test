import { Request, Response, NextFunction }  from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { Product as ProductModel } from '../../model/products.model';
import ApiError from '../../error/ApiError';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: {
        title = 'Product 1',
        type = 'monitors',
        serialNumber = Math.floor(Math.random() * 10000),
        specification = 'Specification 1',
      } = {},
      body
    } = req;
    const { photo } = req?.files as any || {}
    const price = JSON.parse(body.price) || [
      { value: 100, symbol: 'USD', isDefault: 0 },
      { value: 2600, symbol: 'UAH', isDefault: 1 },
    ]
    let fileName: string = ''
    if (photo) {
      fileName = uuidv4() + '.jpg'
      photo.mv(path.resolve(__dirname, '../../', 'static', fileName))
    }
    const response = await ProductModel.create({
      title,
      serialNumber,
      specification,
      price,
      type,
      photo: fileName
    })
    res.status(200).send(response);
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export default createOrder;