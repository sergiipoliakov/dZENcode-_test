const mockGetAllOrdersResponse = [
  {
    _id: '680cf9fc5f33802b122a9d6e',
    title: 'order 1.',
    description: 'decriptions',
    products: [],
    date: '2025-04-26T15:21:32.050Z',
    createdAt: '2025-04-26T15:21:32.053Z',
    updatedAt: '2025-05-05T12:59:20.043Z',
    __v: 0,
  },
  {
    _id: '681899dd45f26820e6c12f36',
    title: 'order 2.',
    description: 'decriptions',
    products: [
      {
        _id: '68190ad317bc4c715a7e5cb1',
        price: [
          { value: 12, symbol: 'USD', isDefault: 0 },
          { value: 500, symbol: 'UAH', isDefault: 1 },
        ],
      },
    ],
    date: '2025-05-05T10:58:37.778Z',
    createdAt: '2025-05-05T10:58:37.782Z',
    updatedAt: '2025-05-05T19:00:52.902Z',
    __v: 0,
  },
];

const mockGetSingleOrderResponse = {
  _id: '681899dd45f26820e6c12f36',
  title: 'order 2',
  products: [
    {
      productId: {
        _id: '68190ad317bc4c715a7e5cb1',
        price: [
          { value: 12, symbol: 'USD' },
          { value: 500, symbol: 'UAH' },
        ],
      },
    },
  ],
};
const mockOrderDataRequest = {
  title: 'Длинное предлинное длиннючее название.',
  description: 'Test Description',
  products: [],
};
const mockCreateOrderResponse = {
  title: "Длинное предлинное длиннючее название.",
  description: "Test Description",
  products: [],
  _id: "681899dd45f26820e6c12f36",
  date: "2025-05-05T10:58:37.778Z",
  createdAt: "2025-05-05T10:58:37.782Z",
  updatedAt: "2025-05-05T10:58:37.782Z",
  __v: 0
}

const mockUpdateOrderDataRequest = {
  title: 'Updated Order Title',
  description: 'Updated description',
  products: [],
};
const mockUpdateOrderResponse = {
  title: "Updated Order Title",
  description: "Updated description",
  products: [],
  _id: "680cf9fc5f33802b122a9d6e",
  createdAt: "2025-05-05T10:58:37.782Z",
  updatedAt: "2025-05-05T10:58:37.782Z",
  __v: 0
}

export {
  mockGetAllOrdersResponse,
  mockGetSingleOrderResponse,
  mockCreateOrderResponse,
  mockOrderDataRequest,
  mockUpdateOrderDataRequest,
  mockUpdateOrderResponse
}