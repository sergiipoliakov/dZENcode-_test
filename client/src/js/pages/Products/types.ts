interface ICreateProductFormValues {
  title: string;
  specification: string;
  guarantee: { start: Date | null, end: Date | null };
  password: string;
  condition: string;
  type: string;
  photo: File | null;
  price: any;
}

export type {
  ICreateProductFormValues
}