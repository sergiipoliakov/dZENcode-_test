import toast, { ToastPosition } from 'react-hot-toast';

interface INotificationsProps {
  duration?: number
  position?: ToastPosition
  message: string
}

const toastMap = {
  success: toast.success,
  error: toast.error,
} as const;

type ToastVariant = keyof typeof toastMap;

const Notification = (type: ToastVariant) => (props: INotificationsProps): void => {
  const { message, duration, position = 'top-right' } = props;

  toastMap[type](message, { duration, position });
};

export default Notification;