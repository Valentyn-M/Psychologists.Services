import ReviewItem from '@/components/ReviewItem/ReviewItem';
import s from './MoreInfo.module.scss';
import Button from '@/components/Button/Button';
import AnimatedModal from '@/components/AnimatedModal/AnimatedModal';
import { useState } from 'react';
import AppointmentForm from '@/components/AppointmentForm/AppointmentForm';

export interface Review {
  comment: string;
  rating: number;
  reviewer: string;
}

export interface MoreInfoProps {
  reviews: Review[];
  someData: {
    avatarUrl: string;
    name: string;
  };
}

const MoreInfo = ({ reviews, someData }: MoreInfoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (): void => {
    setIsModalOpen(true);
  };
  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className={s.moreInfo}>
      <ul className={s.reviews}>
        {reviews.map((review) => (
          <ReviewItem key={review.reviewer} review={review} />
        ))}
      </ul>
      <Button onClick={openModal}>Make an appointment</Button>

      <AnimatedModal isOpen={isModalOpen} onClose={closeModal} contentLabel="Make an appointment">
        <AppointmentForm onClose={closeModal} psychologist={someData} />
      </AnimatedModal>
    </div>
  );
};

export default MoreInfo;
