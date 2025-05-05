type IPrice = {
  value: number,
  symbol: string,
  isDefault: number,
}

interface IProduct {
  title: string,
  specification: string,
  price: IPrice[],
  isNew: number,
  photo: string
  type: string
  guarantee: {
    start: string,
    end:  string
  }
  order: {
    _id: string
    title: string
  },
  date: string,
  _id: string
}

export type {
  IProduct,
  IPrice
}