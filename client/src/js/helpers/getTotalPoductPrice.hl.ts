import { IProduct } from "../types/productTypes";

type Totals = Record<string, number>;
const getTotalPoductPrice = (products: IProduct[]) => {
  if(!products.length) return []
  const totals: Totals = products?.reduce<Totals>((acc, product) => {
    product?.price?.forEach((price) => {
      acc[price.symbol] = (acc[price.symbol] || 0) + price.value;
    });
    return acc;
  }, {});
  const totalsArray = Object.entries(totals).map(([symbol, value]) => ({
    [symbol]: value
  }));
  return totalsArray;
}

export {
  getTotalPoductPrice
}