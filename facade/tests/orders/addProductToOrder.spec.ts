import {addProductToOrder} from '../../src/controllers/orders';
import { Order as OrderModel } from '../../src/model/orders.model';
import { Product as ProductModel } from '../../src/model/products.model';
import ApiError from '../../src/error/ApiError';

jest.mock('../../src/model/orders.model');
jest.mock('../../src/model/products.model');

describe('addProductToOrder controller', () => {
  let mockReq: any;
  let mockRes: any;
  let mockNext: jest.Mock;
  let mockSession: any;

  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    mockNext = jest.fn();

    mockSession = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
      endSession: jest.fn(),
    };

    (OrderModel.startSession as jest.Mock).mockResolvedValue(mockSession);
  });

  it('should add product to order and return updated order', async () => {
    const orderId = '680cf9fc5f33802b122a9d6e';
    const productId = '6818bae1b4b704ff4afe0193';

    const mockOrder = {
      _id: orderId,
      products: [],
    };

    const mockProduct = { _id: productId };

    const updatedOrder = {
      _id: orderId,
      products: [productId],
    };

    mockReq = {
      params: { id: orderId },
      body: { productId },
    };
    (OrderModel.findById as jest.Mock).mockReturnValue({
      session: () => Promise.resolve(mockOrder),
    });
    (ProductModel.findById as jest.Mock).mockReturnValue({
      session: () => Promise.resolve(mockProduct),
    });

    (OrderModel.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedOrder);
    (ProductModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

    await addProductToOrder(mockReq, mockRes, mockNext);

    expect(OrderModel.findById).toHaveBeenCalledWith(orderId);
    expect(ProductModel.findById).toHaveBeenCalledWith(productId);
    expect(OrderModel.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: orderId },
      { $push: { products: productId } },
      { new: true }
    );
    expect(ProductModel.findByIdAndUpdate).toHaveBeenCalledWith(productId, { order: orderId });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(updatedOrder);
  });

  it('should call next with error if order not found', async () => {
    mockReq = { params: { id: 'badOrder' }, body: { productId: 'prod' } };
    (OrderModel.findById as jest.Mock).mockReturnValue({
      session: () => Promise.resolve(null),
    });

    await addProductToOrder(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(ApiError.badRequest('Order not found'));
  });

  it('should call next with error if product not found', async () => {
    mockReq = { params: { id: 'order' }, body: { productId: 'missingProduct' } };
    (OrderModel.findById as jest.Mock).mockReturnValue({
      session: () => Promise.resolve({ _id: 'order', products: [] }),
    });
    (ProductModel.findById as jest.Mock).mockReturnValue({
      session: () => Promise.resolve(null),
    });

    await addProductToOrder(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(ApiError.badRequest('Product not found'));
  });

  it('should call next if product already exists in order', async () => {
    const orderId = 'order';
    const productId = 'prod';
    mockReq = { params: { id: orderId }, body: { productId } };
    (OrderModel.findById as jest.Mock).mockReturnValue({
      session: () => Promise.resolve({ 
        _id: orderId,
      products: [productId],
      }),
    });
    (ProductModel.findById as jest.Mock).mockReturnValue({
      session: () => Promise.resolve({ 
        _id: productId 
      }),
    });

    await addProductToOrder(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(ApiError.badRequest('This product already exists in the order'));
  });
});
