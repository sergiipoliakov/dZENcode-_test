
import { getAllOrders } from '../../src/controllers/orders';

import { Order as OrderModel } from '../../src/model/orders.model';
import ApiError from '../../src/error/ApiError';

jest.mock('../../src/model/orders.model'); 

import { mockGetAllOrdersResponse } from '../../.jest/orders/index'

describe('getAllOrders controller', () => {
  const mockRequest = {} as any;

  let mockResponse: any;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    mockNext = jest.fn();
  });


  it('should return 200 and list of orders', async () => {
    const populateMock = jest.fn().mockResolvedValue(mockGetAllOrdersResponse);
    (OrderModel.find as jest.Mock).mockReturnValue({ populate: populateMock });

    await getAllOrders(mockRequest, mockResponse, mockNext);

    expect(OrderModel.find).toHaveBeenCalled();
    expect(populateMock).toHaveBeenCalledWith('products', 'price _id');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockGetAllOrdersResponse);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next with ApiError on error', async () => {
    const errorMessage = 'Database error';
    const populateMock = jest.fn().mockRejectedValue(new Error(errorMessage));
    (OrderModel.find as jest.Mock).mockReturnValue({ populate: populateMock });

    await getAllOrders(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(ApiError.badRequest(errorMessage));
  });
});
