import { IProduct } from "../../types/productTypes"

interface IProductCardProps extends IProduct {
  onRemove: (id: string) => void,
  ref?: any,
  orderId?: string,
  onAddToOrder: (productId: string) => void
}
export type {
  IProductCardProps
}
