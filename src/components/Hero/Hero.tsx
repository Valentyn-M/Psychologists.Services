import s from './Hero.module.scss';
import clsx from 'clsx';
import HeroTextBlock from '@/components/HeroTextBlock/HeroTextBlock';
import HeroImgBlock from '@/components/HeroImgBlock/HeroImgBlock';

export interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <section className={clsx(s.hero, 'container')}>
      <HeroTextBlock />
      <HeroImgBlock />
    </section>
  );
};

export default Hero;
