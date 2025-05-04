import { useSelector } from 'react-redux';

// Components
import Modal from 'react-bootstrap/esm/Modal';
import { Button } from 'react-bootstrap';

// Types
import { IModalProps } from './types';
import { I18N } from '../../../middlewares/i18n/types';

// Styles
import styles from './index.module.sass';

const ModalComponen = (props: IModalProps) => {
  const {
    translation
  } = useSelector((state: any) => state.i18n as I18N);
  const {
    show,
    onHide,
    onCancel,
    onAccept,
    headerTitle,
    children
   } = props;
  return (
    <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {headerTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer className={styles['modal__footer']}>
          <Button variant="light" onClick={onCancel}>{translation?.cancel}</Button>
          <Button variant="danger" onClick={onAccept}>{translation?.delete}</Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ModalComponen