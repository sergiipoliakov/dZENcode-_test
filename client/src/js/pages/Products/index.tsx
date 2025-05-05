import { useEffect, useState, useRef, createRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

// Api
import { fetchPropducts, fetchRemovePropduct } from '../../http/productApi';

// Constants
import { ADD_PRODUCT } from '../../common/constants/routes.conts';
import { NOTIFICATION_TYPES } from '../../common/constants/errors';

// Components
import ProductCard from '../../components/ProductCard';
import { Select, Text, Modal, Notification } from '../../common/components';

// Types
import { IProduct } from '../../types/productTypes';
import { I18N } from '../../middlewares/i18n/types';

// Styles
import styles from './product.module.sass';
import { fetchAddProductToOrder } from '../../http/ordersApi';

const Products = () => {
  const {
    orders: {
      orderId
    },
    i18n: {
      translation

    }
  } = useSelector((state: any) => state as { i18n: I18N, orders: { orderId: string } });
  const selectOptions = [
    {
      text: translation?.monitors,
      value: 'monitors'

    },
    {
      text: translation?.smartphones,
      value: 'smartphone'
    }
  ];
  const refs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});
  const [products, setProducts] = useState<IProduct[]>([]);
  const [modalShow, setModalShow] = useState(false);
  const [product, setProduct] = useState<IProduct>();
  const [productType, setProductType] = useState('')

  const getProducts = async () => {
    const data = await fetchPropducts({ type: productType });
    setProducts(data)
  }

  useEffect(() => {
    getProducts()
  }, [productType]);

  const onRemoveHandler = (id: string) => {
    setProduct(products.find((item) => item._id === id))
    setModalShow(true)
  }

  const onRemoveModalButtonClick = () => {
    if (product?._id) {
      fetchRemovePropduct(product._id);
      setProducts((prev) => prev.filter((item) => item._id !== product?._id))
      setModalShow(false)
    }
  }

  const onAddProductToOrderHandler = async (productId: string) => {
    try {
      await fetchAddProductToOrder(orderId, productId)
      await getProducts()
      Notification(NOTIFICATION_TYPES.SUCCESS)({
        message: translation?.productAddedSuccessfully as string
      });

    } catch (error: any) {
      Notification(NOTIFICATION_TYPES.ERROR)({
        message: error?.message
      });
    }
  }

    return (
      <div className={styles.products}>
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          headerTitle={translation?.areYouSureYouWantDeleteProduct}
          onCancel={() => setModalShow(false)}
          onAccept={onRemoveModalButtonClick}
        >
          <Text>
            {product?.title}
          </Text>
          <Text>
            {product?.specification}
          </Text>
        </Modal>
        <div className="fl fl--align-c fl--justify-b">
          <Select
            classNames={{ wrapper: styles['products__select-wrapper'] }}
            placeholder={translation?.selectTpe}
            onChange={(value) => setProductType(value)}
            options={selectOptions}
          />
          <div>
            <Link to={ADD_PRODUCT}>
              {translation?.addProduct}
            </Link>
          </div>
        </div>
        <TransitionGroup component={null}>
          {
            products.map((el: IProduct) => {
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
                  <ProductCard onAddToOrder={onAddProductToOrderHandler} orderId={orderId} ref={nodeRef} onRemove={onRemoveHandler} {...el} />
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
      </div>
    );
  };

  export default Products;
