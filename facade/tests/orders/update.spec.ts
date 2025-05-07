import {updateOrder} from '../../src/controllers/orders';
import { Order as OrderModel } from '../../src/model/orders.model';
import ApiError from '../../src/error/ApiError';
import { mockUpdateOrderDataRequest, mockUpdateOrderResponse } from '../../.jest/orders';

jest.mock('../../src/model/orders.model');

describe('updateOrder controller', () => {
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

  it('should update the order and return 200 with updated data', async () => {
    const orderId = '680cf9fc5f33802b122a9d6e';

    mockReq = {
      params: { id: orderId },
      body: mockUpdateOrderDataRequest,
    };

    (OrderModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdateOrderResponse);

    await updateOrder(mockReq, mockRes, mockNext);

    expect(OrderModel.findByIdAndUpdate).toHaveBeenCalledWith(orderId, mockUpdateOrderDataRequest);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(mockUpdateOrderResponse);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next with ApiError on error', async () => {
    const orderId = 'bad-id';
    const updateData = { title: 'Broken' };

    mockReq = {
      params: { id: orderId },
      body: updateData,
    };

    const errorMessage = 'Update failed';
    (OrderModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await updateOrder(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(ApiError.badRequest(errorMessage));
  });
});
