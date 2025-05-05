import { $host } from './index'

const fetchOrders = async () => {
  const { data } = await $host.get('/api/orders')
  return data
}

const fetchAddProductToOrder = async (orderId: string, productId: string) => {
  const { data } = await $host.put(`/api/orders/${orderId}`, {productId})
  return data
}

const fetchRemoveOrder = async (orderId: string) => {
  const { data } = await $host.delete(`/api/orders/${orderId}`)
  return data
}

export {
  fetchOrders,
  fetchRemoveOrder,
  fetchAddProductToOrder
}