import { useEffect, useState } from 'react'
import { IOrder } from './types/ordersTypes'
import { fetchOrders } from './http/ordersApi';

function App() {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const getOrders = async () => {
    const data = await fetchOrders()
    setOrders(data)
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      {
        orders?.map((el) => {
          return (
            <div>
              {el.title}
            </div>
          )
        })
      }
    </div>
  )
}

export default App
