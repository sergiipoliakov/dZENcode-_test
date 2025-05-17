import { Request, Response, NextFunction }  from 'express';
import { Client as ClientModel } from '../../model/clients.model';
import ApiError from '../../error/ApiError';

const createClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body
  } = req;
    const response = await ClientModel.create(body)
    res.status(200).send(response);
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export default createClient;