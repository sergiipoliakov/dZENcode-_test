import {removeOrder} from '../../src/controllers/orders';
import { Order as OrderModel } from '../../src/model/orders.model';
import ApiError from '../../src/error/ApiError';

jest.mock('../../src/model/orders.model');

describe('removeOrder controller', () => {
  let mockReq: any;
  let mockRes: any;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it('should delete the order and return 201 with true', async () => {
    const orderId = '680cf9fc5f33802b122a9d6e';
    mockReq = { params: { id: orderId } };

    (OrderModel.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: orderId });

    await removeOrder(mockReq, mockRes, mockNext);

    expect(OrderModel.findByIdAndDelete).toHaveBeenCalledWith(orderId);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith(true);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next with ApiError if deletion fails', async () => {
    const orderId = 'broken-id';
    mockReq = { params: { id: orderId } };

    const errorMessage = 'Delete failed';
    (OrderModel.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await removeOrder(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(ApiError.badRequest(errorMessage));
  });
});
