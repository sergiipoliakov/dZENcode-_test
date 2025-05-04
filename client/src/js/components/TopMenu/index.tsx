// Components
import Timer from '../Timer';
import SessionCounter from '../SessionCounter';
import LangSelect from '../LangSelect';

// Styles
import styles from './index.module.sass';


const TopMenu = () => {
  return (
    <header className={styles.topmenu}>
      <div className={styles.topmenu__container}>
          <LangSelect />
          <Timer />
          <SessionCounter />
      </div>
    </header>
  )
}

export default TopMenu