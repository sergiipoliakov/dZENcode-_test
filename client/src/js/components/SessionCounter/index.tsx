import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Text } from '../../common';

const socket = io(import.meta.env.VITE_API_URL);

const SessionCounter = () => {

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
      👥 Активных сессий: <Text tag="span" weight="700">{activeCount}</Text>
    </div>
  )
}

export default SessionCounter