// Components
import Container from 'react-bootstrap/esm/Container';
import Timer from '../Timer';
import SessionCounter from '../SessionCounter';

// Styles
import styles from './index.module.sass';


const TopMenu = () => {
  return (
    <header className={styles.topmenu}>
      <Container className={styles.topmenu__container}>
          <Timer />
          <SessionCounter />
      </Container>
    </header>
  )
}

export default TopMenu