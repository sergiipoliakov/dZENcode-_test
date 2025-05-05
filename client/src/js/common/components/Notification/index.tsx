import toast from 'react-hot-toast';
import { INotificationsProps } from './types';

const Notification = (type: string) => (props: INotificationsProps): void => {
    const {
        message,
        duration,
        position = "top-right"
    } = props;

    toast[type as string](message, {
        duration,
        position,
    });
};

export default Notification;
