import { IProduct } from "./productTypes";

interface IOrder {
  _id: string,
  title: string,
  date: string,
  description: string,
  products: IProduct[]
}

export type {
  IOrder
}