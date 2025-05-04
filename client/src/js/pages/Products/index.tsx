import { useEffect, useState, useRef, createRef } from 'react';
import { useSelector } from 'react-redux';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

// Api
import { fetchPropducts, fetchRemovePropduct } from '../../http/productApi';

// Components
import ProductCard from '../../components/ProductCard';
import { Select, Text, Modal } from '../../common/components';

// Types
import { IProduct } from '../../types/productTypes';
import { I18N } from '../../middlewares/i18n/types';

// Styles
import styles from './product.module.sass';

const Products = () => {
  const {
    translation
  } = useSelector((state: any) => state.i18n as I18N);
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
      <Select
        classNames={{ wrapper: styles['products__select-wrapper'] }}
        placeholder={translation?.selectTpe}
        onChange={(value) => setProductType(value)}
        options={selectOptions}

      />
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
                <ProductCard ref={nodeRef} onRemove={onRemoveHandler} {...el} />
              </CSSTransition>
            )
          })
        }
      </TransitionGroup>
    </div>
  );
};

export default Products;
