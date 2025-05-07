import {createOrder} from '../../src/controllers/orders/';
import { Order as OrderModel } from '../../src/model/orders.model';
import ApiError from '../../src/error/ApiError';
import { mockCreateOrderResponse, mockOrderDataRequest } from '../../.jest/orders'
jest.mock('../../src/model/orders.model');

describe('createOrder controller', () => {
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

  it('should create a new order and return 200', async () => {

    mockReq = { body: mockOrderDataRequest };

    (OrderModel.create as jest.Mock).mockResolvedValue(mockCreateOrderResponse);

    await createOrder(mockReq, mockRes, mockNext);

    expect(OrderModel.create).toHaveBeenCalledWith(mockOrderDataRequest);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(mockCreateOrderResponse);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next with ApiError on failure', async () => {
    const mockOrder = { title: 'Broken Order' };
    const errorMessage = 'Database write error';

    mockReq = { body: mockOrder };

    (OrderModel.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await createOrder(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(ApiError.badRequest(errorMessage));
  });
});
