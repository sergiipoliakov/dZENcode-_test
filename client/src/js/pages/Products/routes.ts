import { lazy } from 'react';
import { PRODUCT_ROUTE } from '../../utils/constants';

const Products = lazy(() => import('.'));
// const AddProduct = lazy(() => import('./index.add'));

export default [
  {
    path: PRODUCT_ROUTE,
    component: Products
  }
  //   {
  //     path: '/account/products/create',
  //     component: AddProduct
  // }
];
