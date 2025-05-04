import { IProduct } from "../../types/productTypes"

interface IProductCardProps extends IProduct {
  onRemove: (id: string) => void,
  ref?: any
}
export type {
  IProductCardProps
}
