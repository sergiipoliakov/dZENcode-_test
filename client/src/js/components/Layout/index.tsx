// Components
import TopMenu from '../TopMenu';
import Avatar from '../Avatar';
import Navigation from '../Navigation';

// Types
import { ILayoutProps } from './types';

// Styles
import styles from './layout.module.sass';

const Layout = (props: ILayoutProps) => {
  const {
    children
  } = props;

  return (
    <div className={styles.layout}>
      <TopMenu />
      <div className="fl height--100">
        <div className={styles['layout__navgation-wrapper']}>
          <Avatar />
          <Navigation />
        </div>
        <div className={`${styles['layout__content-wrapper']} width--100`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
