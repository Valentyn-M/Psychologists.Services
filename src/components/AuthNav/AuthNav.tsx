import React, { useState } from 'react';
import Button from '../Button/Button';
import MainReactModal from '../ReactModal/MainReactModal';
import LoginForm from '../LoginForm/LoginForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';

export interface AuthNavProps {}

const AuthNav: React.FC<AuthNavProps> = ({}) => {
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
    <>
      <Button outline onClick={() => openModal('login')}>
        Log In
      </Button>
      <Button onClick={() => openModal('register')}>Registration</Button>
      <MainReactModal
        isOpen={isModalOpen}
        onClose={closeModal}
        contentLabel={modalType === 'login' ? 'Login form' : 'Registration form'}
      >
        {modalType === 'login' && <LoginForm />}
        {modalType === 'register' && <RegistrationForm />}
      </MainReactModal>
    </>
  );
};

export default AuthNav;
