import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Api
import { fetchPropducts, fetchRemovePropduct } from '../../http/productApi';

// Components
// import Modal from 'react-bootstrap/esm/Modal';
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
      {
        products.map((el: IProduct) => {
          return (
            <ProductCard key={el._id} onRemove={onRemoveHandler} {...el} />
          )
        })
      }

    </div>
  );
};

export default Products;
