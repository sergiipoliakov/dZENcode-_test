
import { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useLocation,
  NavLink,
} from 'react-router-dom';

//Constants
import { ORDER_ROUTE, PRODUCT_ROUTE } from '../../common/constants/routes.conts';

// Types
import { Menu, NavigatiosTypes } from './types';
import { I18N } from '../../middlewares/i18n/types';

// Styles
import styles from './navigation.module.sass';

const Navigation = (props: NavigatiosTypes) => {
  const { pathname: path } = useLocation();
  const {
    translation
  } = useSelector((state: any) => state.i18n as I18N);
  const [active, setActive] = useState({} as any);
  const { className = '', dataCy, onNavClick = () => null } = props;

  const LINKS = [
    {
      label: 'orders',
      icon: 'orders',
      link: translation?.orders,
      path: ORDER_ROUTE
    },
    {
      label: 'products',
      icon: 'products',
      link: translation?.products,
      path: PRODUCT_ROUTE
    }
  ] as Menu[];

  useLayoutEffect(() => {
    const prevPath = LINKS?.find((el) => path.includes(el.label as string))?.path;
    setActive({ ...active, [prevPath]: prevPath });
  }, []);

  return (
    <div data-cy={dataCy} className={styles.nav}>
        {LINKS?.map((link) => {
          return (
            <NavLink
              end
              data-cy={link?.label}
              key={link?.link}
              to={`${link?.path}`}
              onClick={onNavClick}
              className={({ isActive }) => (`${isActive ? styles['nav__item--active'] : ''} ${className} ${styles.nav__item} fl fl--align-c`)}
            >
              <div
                className={`${styles.nav__link} fl fl--align-c`}
              >
                <span className={styles['nav__link-text']}>{link?.link}</span>
              </div>
            </NavLink>
          );
        })}
    </div>
  );
};

export default Navigation;
