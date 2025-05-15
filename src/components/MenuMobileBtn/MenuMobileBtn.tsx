import { forwardRef, useEffect } from 'react';
import s from './MenuMobileBtn.module.scss';
import clsx from 'clsx';

export interface MenuMobileBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  handleActivate: () => void;
}

const MenuMobileBtn = forwardRef<HTMLButtonElement, MenuMobileBtnProps>(
  ({ isActive, handleActivate, ...rest }, ref) => {
    useEffect(() => {
      const body = document.body;

      if (isActive) {
        body.classList.add('lock');
      } else {
        body.classList.remove('lock');
      }

      // Очищення, якщо компонент буде розмонтовуватись
      return () => {
        body.classList.remove('lock');
      };
    }, [isActive]);

    return (
      <button
        ref={ref}
        className={clsx(s.btnBurger, isActive && s.active)}
        type="button"
        {...rest}
        aria-label="Show or Hide menu"
        onClick={handleActivate}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
    );
  }
);

export default MenuMobileBtn;
