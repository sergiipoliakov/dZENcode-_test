import { IOrder } from "../../types/ordersTypes";

interface IOredrCard extends IOrder {
  onClick: () => void,
  onRemove: () => void,
  active: boolean,
  onArrowClick: () => void
}
export type {
  IOredrCard
}