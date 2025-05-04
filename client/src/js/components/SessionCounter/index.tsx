import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

// Components
import { Text } from '../../common/components';

// Types
import { I18N } from '../../middlewares/i18n/types';

const socket = io(import.meta.env.VITE_API_URL);

const SessionCounter = () => {
  const {
    translation
  } = useSelector((state: any) => state.i18n as I18N);
  const [activeCount, setActiveCount] = useState(1);

  useEffect(() => {  
    socket.on('updateCount', (count) => {
      setActiveCount(count);
    });
    return () => {
      socket.off('updateCount');
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      👥 {translation?.activeSessions}: <Text tag="span" weight="700">{activeCount}</Text>
    </div>
  )
}

export default SessionCounter