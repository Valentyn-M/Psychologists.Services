import React from 'react';
import Button from '../Button/Button';
import { svgIcon } from '../App';

export interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <section>
      <div>
        <h1>
          The road to the <span className="brand-color">depths</span> of the human soul
        </h1>
        <p>
          We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of
          our experienced psychologists.
        </p>
        <Button>
          <span>Get started</span>
          <svg>
            <use href={`${svgIcon}#icon-arrow-outward`} />
          </svg>
        </Button>
      </div>
      <div>
        <div>
          <svg>
            <use href={`${svgIcon}#icon-check`} />
          </svg>
          <div>
            <p>Experienced psychologists</p>
            <p>15,000</p>
          </div>
        </div>
        <div>
          <picture>
            <source srcSet="/src/images/hero-image_2x.jpg" media="(min-resolution: 192dpi)" />
            <img src="/src/images/hero-image.jpg" alt="Psychologist" />
          </picture>
          <svg>
            <use href={`${svgIcon}#icon-question`} />
          </svg>
          <svg>
            <use href={`${svgIcon}#icon-users`} />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
