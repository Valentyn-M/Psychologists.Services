import React from 'react';
import Modal from 'react-modal';
import { svgIcon } from '../App';
import s from './MainReactModal.module.scss';

export interface MainReactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentLabel: string;
  children: React.ReactNode;
}

// Універсальний компонент модалки
// Передаємо модалкі тільки:
// - contentLabel (надає екранним зчитувачам опис того, що містить модальне вікно)
// - children (Вміст вікна)
const MainReactModal: React.FC<MainReactModalProps> = ({ isOpen, onClose, contentLabel, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={contentLabel}
      className={s.modal}
      overlayClassName={s.overlay}
    >
      <button onClick={onClose} type="button" className={s.closeBtn}>
        <svg className={s.conClose}>
          <use href={`${svgIcon}#icon-close`} />
        </svg>
      </button>
      {children}
    </Modal>
  );
};

export default MainReactModal;
