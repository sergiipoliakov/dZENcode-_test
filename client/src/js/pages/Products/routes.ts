import { lazy } from 'react';
import { PRODUCT_ROUTE, ADD_PRODUCT } from '../../common/constants/routes.conts';

const Products = lazy(() => import('.'));
const AddProduct = lazy(() => import('./index.create'));

export default [
  {
    path: PRODUCT_ROUTE,
    component: Products
  },
  {
    path: ADD_PRODUCT,
    component: AddProduct
  }
];
