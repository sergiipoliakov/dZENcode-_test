
import { useEffect, useState, createRef, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

// Components
import OrderCard from '../../components/OrderCard';
import { Text, Modal, Notification } from '../../common/components';
import { Button } from 'react-bootstrap';

// Constants
import { PRODUCT_ROUTE } from '../../common/constants/routes.conts';

// Img
import productsBurgerImg from '/products-burger.png';

// Actions
import * as actions from './actions/orders.actions';

// Helpers
import { getTotalPoductPrice } from '../../helpers/getTotalPoductPrice.hl';
import { getCurrencySymbol } from '../../helpers/getCurrencySymbol.hl';

// Types
import { IOrder } from '../../types/ordersTypes';
import { I18N } from '../../middlewares/i18n/types';

// Api
import { fetchOrders, fetchRemoveOrder } from '../../http/ordersApi';

// Stypes
import styles from './orders.module.sass';
import { NOTIFICATION_TYPES } from '../../common/constants/errors';

const Orders = () => {
  const {
    translation
  } = useSelector((state: any) => state.i18n as I18N);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const refs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});
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
  const onRemoveModalButtonClick = async () => {
    try {
      if (orderId) {
        await fetchRemoveOrder(orderId)
        setOrders((prev) => prev.filter((item) => item._id !== orderId))
        setModalShow(false)
        dispatch(actions.setOrderId(''));
        setIsInfoBlockOpen(false)
        Notification(NOTIFICATION_TYPES.SUCCESS)({
          message: translation?.success as string
        })
      }
      
    } catch (error: any) {
      Notification(NOTIFICATION_TYPES.ERROR)({
        message: error.message
      })
    }
  }

  const onAddProductToOrderHandler = async (id: string) => {
    dispatch(actions.setOrderId(id));
    navigate(PRODUCT_ROUTE)
  }

  return (
    <div className={`${styles.orders} width--100`}>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        headerTitle={translation?.areYouSureYouWantDeleteProduct}
        onCancel={() => setModalShow(false)}
        onAccept={onRemoveModalButtonClick}
      >
        <Text>
          {order?.title}
        </Text>
        <Text>
          {order?.description}
        </Text>
      </Modal>
      <div className={`${styles['orders__main-block']} ${isInfoBlockOpen && order ? styles['orders__main-block--open'] : ''}`}>
        <TransitionGroup component={null}>
          {
            orders.map((el) => {
              if (!refs.current[el._id]) {
                refs.current[el._id] = createRef<any>();
              }
              const nodeRef = refs.current[el._id];
              return (
                <CSSTransition
                  key={el._id}
                  nodeRef={nodeRef}
                  timeout={500}
                  classNames="item"
                >
                  <OrderCard
                    ref={nodeRef}
                    onRemove={() => onRemoveHandler(el._id)}
                    onClick={() => onSetOrderHandler(el._id)}
                    active={isInfoBlockOpen && el._id === order?._id}
                    onArrowClick={() => setIsInfoBlockOpen(false)}
                    {...el}
                  />

                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
      </div>
      <div className={`${styles['orders__info-block']} ${isInfoBlockOpen && order ? styles['orders__info-block--open'] : ''}`}>
        <Text size="medium" className="margin--b-24">
          {translation?.nameOrder} {order?.title}
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
              {translation?.['product(s)']}
            </Text>
          </div>
          <Button onClick={() => onAddProductToOrderHandler(order?._id as string)}>
          {translation?.addProduct}
          </Button>
        </div>
        <div className="fl fl--gap-22 margin--b-24">
          <Text>
            {translation?.dateOfCreate}:
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
                {translation?.totalPriceProducts}:
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
