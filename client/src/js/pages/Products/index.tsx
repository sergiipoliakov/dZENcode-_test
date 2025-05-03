import { useEffect, useState } from 'react';

// Api
import { fetchPropducts, fetchRemovePropduct } from '../../http/productApi';

// Components
import Modal from 'react-bootstrap/esm/Modal';
import ProductCard from '../../components/ProductCard';
import Button from 'react-bootstrap/esm/Button';
import { Select, Text } from '../../common';

// Types
import { IProduct } from '../../types/productTypes';

// Styles
import styles from './product.module.sass';

const selectOptions = [
  {
    text: 'Мониторы',
    value: 'monitors'

  },
  {
    text: 'Смартфоны',
    value: 'smartphone'

  }
];

const Products = () => {
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
          <Text>
            {product?.title}
          </Text>
          <Text>
            {product?.specification}
          </Text>
        </Modal.Body>
        <Modal.Footer className={styles['products__modal-footer']}>
          <Button variant="light" onClick={() => setModalShow(false)}>отменыть</Button>
          <Button variant="danger" onClick={onRemoveModalButtonClick}>удалить</Button>
        </Modal.Footer>
      </Modal>

      <Select
        classNames={{ wrapper: styles['products__select-wrapper'] }}
        placeholder="выберите тип"
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
