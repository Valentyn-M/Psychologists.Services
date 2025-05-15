import { Link } from 'react-router-dom';
import s from './HeroTextBlock.module.scss';
import { svgIcon } from '@/components/App';
import clsx from 'clsx';

export interface HeroTextBlockProps {}

const HeroTextBlock = ({}: HeroTextBlockProps) => {
  return (
    <div className={s.textBlock}>
      <h1 className={s.title}>
        The road to the <span className={clsx('brand-color', s.depths)}>depths</span> of the human soul
      </h1>
      <p className={s.slogan}>
        We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our
        experienced psychologists.
      </p>
      <Link to="/psychologists" className={s.link}>
        <span>Get started</span>
        <svg className={s.iconArrow}>
          <use href={`${svgIcon}#icon-arrow-outward`} />
        </svg>
      </Link>
    </div>
  );
};

export default HeroTextBlock;
