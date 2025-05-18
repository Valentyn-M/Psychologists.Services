import { svgIcon } from '@/components/App';
import s from './ReviewItem.module.scss';

export interface ReviewItem {
  comment: string;
  rating: number;
  reviewer: string;
}

export interface ReviewItemProps {
  review: ReviewItem;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const reviewerFirstLetter = review.reviewer[0];

  return (
    <li className={s.review}>
      <div className={s.header}>
        <div className={s.avatar}>{reviewerFirstLetter}</div>
        <div className={s.info}>
          <div className={s.reviewer}>{review.reviewer}</div>
          <div className={s.raiting}>
            <svg className={s.iconStar}>
              <use href={`${svgIcon}#icon-star`} />
            </svg>
            <span className={s.raitingValue}>{review.rating}</span>
          </div>
        </div>
      </div>
      <div className={s.comment}>{review.comment}</div>
    </li>
  );
};

export default ReviewItem;
