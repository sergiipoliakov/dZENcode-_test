
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';


// Components
import { Button, Modal } from 'react-bootstrap';
import OrderCard from '../../components/OrderCard';
import { Text } from '../../common';

// Img
import productsBurgerImg from '/products-burger.png';

// Helpers
import { getTotalPoductPrice } from '../../helpers/getTotalPoductPrice.hl';
import { getCurrencySymbol } from '../../helpers/getCurrencySymbol.hl';

// Types
import { IOrder } from '../../types/ordersTypes';

// Api
import { fetchOrders, fetchRemoveOrder } from '../../http/ordersApi';

// Stypes
import styles from './orders.module.sass';

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isInfoBlockOpen, setIsInfoBlockOpen] = useState(false)
  const [order, setOrder] = useState<IOrder>();
  const [orderId, setOredId] = useState('')
  const [modalShow, setModalShow] = useState(false);

  const getOrders = async () => {
    const data = await fetchOrders();
    setOrders(data)
  }

  useEffect(() => {
    getOrders();
  }, []);

  const onSetOrderHandler = (id: string) => {
    setIsInfoBlockOpen(true)
    setOrder(orders?.find((item) => item._id === id))
  }

  const onRemoveHandler = (id: string) => {
    setOredId(id)
    setModalShow(true)
  }
  const onRemoveModalButtonClick = () => {
    if (orderId) {
      fetchRemoveOrder(orderId)
      setOrders((prev) => prev.filter((item) => item._id !== orderId))
      setModalShow(false)
    }
  }

  return (
    <div className={`${styles.orders} width--100`}>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Вы уверены что хотите удалить продукт?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {order?.title}
          </p>
          <p>
            {order?.description}
          </p>
        </Modal.Body>
        <Modal.Footer className={styles['products__modal-footer']}>
          <Button variant="light" onClick={() => setModalShow(false)}>отменить</Button>
          <Button variant="danger" onClick={onRemoveModalButtonClick}>удалить</Button>
        </Modal.Footer>
      </Modal>
      <div className={`${styles['orders__main-block']} ${isInfoBlockOpen && order ? styles['orders__main-block--open'] : ''}`}>
        {
          orders.map((el) => {
            return (
              <OrderCard
                onRemove={() => onRemoveHandler(el._id)}
                onClick={() => onSetOrderHandler(el._id)}
                key={el._id}
                active={isInfoBlockOpen && el._id === order?._id}
                onArrowClick={() => setIsInfoBlockOpen(false)}
                {...el}
              />
            )
          })
        }
      </div>
      <div className={`${styles['orders__info-block']} ${isInfoBlockOpen && order ? styles['orders__info-block--open'] : ''}`}>
        <Text size="medium" className="margin--b-24">
          Название прихода: {order?.title}
        </Text>
        <div className="fl fl--align-c fl--gap-22 margin--b-24 width-100">
          <div>
            <img src={productsBurgerImg} width={52} />
          </div>
          <div>
            <Text size="medium">
              {order?.products.length}
            </Text>
            <Text>
              продуктов
            </Text>
          </div>
        </div>
        <div className="fl fl--gap-22 margin--b-24">
          <Text>
            дата создания:
          </Text>
          <div>
            <Text>
              {dayjs(order?.date).format('YYYY-MM-DD')}
            </Text>
            <Text>
              {dayjs(order?.date).format('DD MMM YYYY')}
            </Text>

          </div>
        </div>
        {
          order?.products?.length ? (
            <div className="fl fl--gap-22 margin--b-24">
              <Text>
                общая цена продуктов:
              </Text>
              <div>
                {
                  getTotalPoductPrice(order?.products).map((item, index) => {
                    const [symbol, value] = Object.entries(item)[0];
                    return (
                      <Text key={index} color="gray">
                        {value} {getCurrencySymbol(symbol)}
                      </Text>
                    )
                  })
                }
              </div>
            </div>
          ) : null
        }
      </div>

    </div>
  );
};

export default Orders;
