import { getOrder } from '../../src/controllers/orders';
import { Order as OrderModel } from '../../src/model/orders.model';
import ApiError from '../../src/error/ApiError';
import { mockGetSingleOrderResponse } from '../../.jest/orders/index' ;

jest.mock('../../src/model/orders.model');

describe('getOrder controller', () => {
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

  it('should return 200 and the order by id', async () => {
    const orderId = '681899dd45f26820e6c12f36';

    mockReq = { params: { id: orderId } };

    const populateMock = jest.fn().mockResolvedValue(mockGetSingleOrderResponse);
    (OrderModel.findById as jest.Mock).mockReturnValue({ populate: populateMock });

    await getOrder(mockReq, mockRes, mockNext);

    expect(OrderModel.findById).toHaveBeenCalledWith(orderId);
    expect(populateMock).toHaveBeenCalledWith('products.productId');
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(mockGetSingleOrderResponse);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next with ApiError on failure', async () => {
    const orderId = 'invalid-id';
    const errorMessage = 'Something went wrong';

    mockReq = { params: { id: orderId } };
    const populateMock = jest.fn().mockRejectedValue(new Error(errorMessage));
    (OrderModel.findById as jest.Mock).mockReturnValue({ populate: populateMock });

    await getOrder(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(ApiError.badRequest(errorMessage));
  });
});
