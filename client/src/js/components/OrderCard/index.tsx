import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

import productsBurgerImg from '/products-burger.png';

// Components
import { Button } from 'react-bootstrap';
import { Text } from '../../common/components';
import RightArrowSvg from '/src/icons/right-arrow.svg?react';
import RemoveSvg from '/src/icons/remove.svg?react';

// Helpers
import { getTotalPoductPrice } from '../../helpers/getTotalPoductPrice.hl';
import { getCurrencySymbol } from '../../helpers/getCurrencySymbol.hl';

// Types
import { IOredrCard } from './types';
import { I18N } from '../../middlewares/i18n/types';

// Styles
import styles from './index.module.sass';

const OrderCard = (props: IOredrCard) => {
  const {
    translation
  } = useSelector((state: any) => state.i18n as I18N);
  const {
    title,
    products,
    date,
    onClick,
    onRemove,
    active,
    onArrowClick
  } = props;

  return (
    <div onClick={onClick} className={`${styles['order-card']} ${active ? styles['order-card--active'] : ''}`}>
      <div className={styles['order-card__title-wrapper']}>
        <Text size="medium" color="dark" className={styles['order-card__title']}>
          {title}
        </Text>
      </div>
      <div>
        <img src={productsBurgerImg} width={52} />
      </div>
      <div>
        <Text size="medium" color="gray">
          {products.length}
        </Text>
        <Text color="gray">
        {translation?.['product(s)']}
        </Text>
      </div>
      <div className="overflow--hidden">
        <Text color="gray" className="overflow--hidden text-overflow--ellipsis font--no-wrap">
          {dayjs(date).format('YYYY-MM-DD')}
        </Text>
        <Text color="gray" className="overflow--hidden text-overflow--ellipsis font--no-wrap">
          {dayjs(date).format('DD MMM YYYY')}
        </Text>
      </div>
      <div className="overflow--hidden">
        {
          products.length ? (
            <>
                {
                  getTotalPoductPrice(products).map((item, index) => {
                    const [symbol, value] = Object.entries(item)[0];
                    return (
                      <Text key={index} color="gray" className="overflow--hidden text-overflow--ellipsis font--no-wrap">
                        {value} {getCurrencySymbol(symbol)}
                      </Text>
                    )
                  })
                }
            </>
          ) : null
        }
      </div>
      <Button onClick={(e) =>{e.stopPropagation(); onRemove()}} className="margin--l-auto" variant="light">
        <RemoveSvg width={20} height={20} />
      </Button>
      <div onClick={(e) => { e.stopPropagation(); onArrowClick()}} className={`${styles['order-card__arrow-svg-wrapper']} ${active ? styles['order-card__arrow-svg-wrapper--active'] : ''}`}>
        <RightArrowSvg className={styles['order-card__arrow-svg']} />
      </div>
    </div>
  )
}

export default OrderCard;
