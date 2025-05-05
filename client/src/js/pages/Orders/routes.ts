import { lazy } from 'react';
import { ORDER_ROUTE } from '../../common/constants/routes.conts';

const Orders = lazy(() => import('.'));


export default [
  {
    path: ORDER_ROUTE,
    component: Orders
  }
];
