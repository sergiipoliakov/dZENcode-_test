import { lazy } from 'react';
import { ORDER_ROUTE } from '../../utils/constants';

const Orders = lazy(() => import('.'));


export default [
  {
    path: ORDER_ROUTE,
    component: Orders
  },
  // {
  //   path: `${ORDER_ROUTE}/:id`,
  //   component: UserOrders
  // }
];
