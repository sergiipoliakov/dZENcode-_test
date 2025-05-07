import { $host } from './index'

const fetchPropducts = async (query: { type: string }) => {
  const { type } = query;
  const { data } = await $host.get(`/products?type=${type}`)
  return data
}
const fetchRemovePropduct = async (productId: string) => {
  const { data } = await $host.delete(`/products/${productId}`)
  return data
}

const fetchAddPropduct = async (formData: any) => {
  const { data } = await $host.post('/products', formData)
  return data
}

export {
  fetchPropducts,
  fetchRemovePropduct,
  fetchAddPropduct
}