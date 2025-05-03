import { useEffect, useState } from 'react';

// Styles
import styles from './index.module.sass';

const Timer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) =>
    date.toLocaleString('uk-UA', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  return (
    <div className={styles.timer}>
      🕒 {formatDate(currentTime)}
    </div>
  )
}

export default Timer