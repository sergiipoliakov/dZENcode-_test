import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

// Types
import { I18N } from '../../middlewares/i18n/types';
import { IProductCardProps } from './types';

// Components
import { Button } from 'react-bootstrap';
import { Text } from '../../common/components'
import RemoveSvg from '/src/icons/remove.svg?react';

// Img
import defaultImg from '/default-img.png';

// Styles
import styles from './index.module.sass';

const ProductCard = (props: IProductCardProps) => {
  const {
    translation
  } = useSelector((state: any) => state.i18n as I18N);
  const {
    title,
    specification,
    price,
    guarantee,
    isNew,
    order,
    photo,
    type,
    _id,
    onRemove,
    ref,
    orderId,
    onAddToOrder
  } = props

  const alreadyExists = order?._id === orderId;
  return (
        <div ref={ref} className={styles['product-card']}>
          {
            orderId && !alreadyExists && !order?._id ? (
                <div>
                  <Button onClick={() => onAddToOrder(_id)}>
                    +
                  </Button>
                </div>
            ) : null
          }
          <div>
            <img src={`${photo ? `${import.meta.env.VITE_API_URL}${photo}` : defaultImg}`} width={40} alt={title} />
          </div>
          <div className={styles['product-card__title-wrapper']}>
            <Text className="overflow--hidden text-overflow--ellipsis font--no-wrap">
              {title}
            </Text>
            <Text className="overflow--hidden text-overflow--ellipsis font--no-wrap">
              {specification}
            </Text>
          </div>
          <div className={styles['product-card__garantee-wrapper']}>
            <div className="fl fl--align-c">
              <Text className="margin--r-12">
                {translation?.guarantee}
              </Text>
              <div className="fl fl--dir-col">
                <Text className="overflow--hidden text-overflow--ellipsis font--no-wrap">
                  c {dayjs(guarantee?.start).format('YYYY-MM-DD')} / {dayjs(guarantee?.start).format('DD MMM YYYY')}
                </Text>
                <Text className="overflow--hidden text-overflow--ellipsis font--no-wrap">
                  по {dayjs(guarantee?.end).format('YYYY-MM-DD')} / {dayjs(guarantee?.end).format('DD MMM YYYY')}
                </Text>
              </div>
            </div>
          </div>
          <div>
            <Text>{isNew ? translation?.new : translation?.secondHand}</Text>
          </div>
          <div className={styles['product-card__price-wrapper']}>
            {price.map((el, idx) => {
              const { value, symbol, isDefault } = el;
              return (
                <div key={idx} className={`${styles['product-card__price']} ${isDefault ? styles['product-card__price--default'] : ''}`}>
                  <Text>
                    {value}
                  </Text>
                  <Text>
                    {symbol}
                  </Text>
                </div>
              )
            })}

          </div>
          <div>
            {type}
          </div>
          <div>
            <Text>
              {order?.title}
            </Text>
          </div>
          <Button className="margin--l-auto" onClick={() => onRemove(_id)} variant="light">
            <RemoveSvg width={20} height={20} />
          </Button>
        </div>
  )
}

export default ProductCard