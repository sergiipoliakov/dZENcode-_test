import { $host } from './index'

const fetchOrders = async () => {
  const { data } = await $host.get('/api/orders')
  return data
}

const fetchAddProductToOrders = async (orderId: string) => {
  const { data } = await $host.get(`/api/orders/${orderId}`, )
  return data
}

const fetchRemoveOrder = async (orderId: string) => {
  const { data } = await $host.delete(`/api/orders/${orderId}`)
  return data
}

export {
  fetchOrders,
  fetchRemoveOrder,
  fetchAddProductToOrders
}