import { svgIcon } from '@/components/App';
import s from './PsychologistItem.module.scss';
import { useState } from 'react';
import MoreInfo from '@/components/MoreInfo/MoreInfo';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import ButtonFavorite from '@/components/ButtonFavorite/ButtonFavorite';

export interface Review {
  comment: string;
  rating: number;
  reviewer: string;
}

export interface Psychologist {
  about: string;
  avatar_url: string;
  experience: string;
  initial_consultation: string;
  license: string;
  name: string;
  price_per_hour: number;
  rating: number;
  reviews: Review[];
  specialization: string;
  id: string;
}

export interface PsychologistItemProps {
  data: Psychologist;
}

const PsychologistItem = ({ data }: PsychologistItemProps) => {
  const [isShown, setIsShown] = useState<boolean>(false);

  const isMobile = useMediaQuery('(max-width: 30rem)'); // 480px

  const handleClick = (): void => {
    setIsShown(true);
  };

  return (
    <li className={s.psychologistItem}>
      <div className={s.imgBlock}>
        <div className={s.imgWrap}>
          <img className={s.img} src={data.avatar_url} alt="Avatar" width="96" height="96" />
        </div>
        {isMobile && <ButtonFavorite id={data.id} />}
      </div>

      <div className={s.mainBlock}>
        <div className={s.header}>
          <div className={s.mainInfo}>
            <div className={s.jobTitle}>Psychologist</div>
            <div className={s.name}>{data.name}</div>
          </div>
          <div className={s.addInfo}>
            <div className={s.addInfoBlock}>
              <div className={s.raiting}>
                <svg className={s.iconStar}>
                  <use href={`${svgIcon}#icon-star`} />
                </svg>
                <div className={s.raitingValue}>Rating: {data.rating}</div>
              </div>
              <span className={s.devider}></span>
              <div className={s.price}>
                Price / 1 hour: <span className={s.priceValue}>{data.price_per_hour}</span>
              </div>
            </div>
            {!isMobile && <ButtonFavorite id={data.id} />}
          </div>
        </div>

        <ul className={s.tags}>
          <li className={s.tagItem}>
            <span className={s.tagName}>Experience:</span> {data.experience}
          </li>
          <li className={s.tagItem}>
            <span className={s.tagName}>License:</span> {data.license}
          </li>
          <li className={s.tagItem}>
            <span className={s.tagName}>Specialization:</span> {data.specialization}
          </li>
          <li className={s.tagItem}>
            <span className={s.tagName}>Initial cconsultation:</span> {data.initial_consultation}
          </li>
        </ul>

        <p className={s.about}>{data.about}</p>

        {!isShown && (
          <button className={s.btnReadMore} type="button" onClick={handleClick}>
            Read more
          </button>
        )}

        {isShown && <MoreInfo reviews={data.reviews} someData={{ avatarUrl: data.avatar_url, name: data.name }} />}
      </div>
    </li>
  );
};

export default PsychologistItem;
