import { svgIcon } from '@/components/App';
import s from './HeroImgBlock.module.scss';
import heroImage from '@/images/hero-image.jpg';
import heroImage2x from '@/images/hero-image_2x.jpg';

export interface HeroImgBlockProps {}

const HeroImgBlock = ({}: HeroImgBlockProps) => {
  return (
    <div className={s.imgBlock}>
      <div className={s.priceBlock}>
        <div className={s.iconCheckWrap}>
          <svg className={s.iconCheck}>
            <use href={`${svgIcon}#icon-check`} />
          </svg>
        </div>
        <div className={s.textBlock}>
          <p className={s.text}>Experienced psychologists</p>
          <p className={s.price}>15,000</p>
        </div>
      </div>
      <div>
        <picture>
          <source srcSet={heroImage2x} media="(min-resolution: 192dpi)" />
          <img src={heroImage} alt="Psychologist" width="464" height="526" />
        </picture>
        <div className={s.iconQuestionWrap}>
          <svg className={s.iconQuestion}>
            <use href={`${svgIcon}#icon-question`} />
          </svg>
        </div>
        <div className={s.iconUsersWrap}>
          <svg className={s.iconUsers}>
            <use href={`${svgIcon}#icon-users`} />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroImgBlock;
