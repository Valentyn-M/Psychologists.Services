import Button from '@/components/Button/Button';
import LoginForm from '@/components/LoginForm/LoginForm';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import { useState } from 'react';
import s from './AuthPanel.module.scss';
import AnimatedModal from '@/components/AnimatedModal/AnimatedModal';

export interface AuthPanelProps {}

const AuthPanel: React.FC<AuthPanelProps> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'register' | null>(null);

  const openModal = (type: 'login' | 'register'): void => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setModalType(null);
  };

  return (
    <div className={s.AuthPanel}>
      <Button outline onClick={() => openModal('login')}>
        Log In
      </Button>
      <Button onClick={() => openModal('register')}>Registration</Button>
      <AnimatedModal
        isOpen={isModalOpen}
        onClose={closeModal}
        contentLabel={modalType === 'login' ? 'Login form' : 'Registration form'}
      >
        {modalType === 'login' && <LoginForm />}
        {modalType === 'register' && <RegistrationForm />}
      </AnimatedModal>
    </div>
  );
};

export default AuthPanel;
