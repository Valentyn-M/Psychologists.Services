import clsx from 'clsx';
import s from './MenuMobile.module.scss';
import Menu from '@/components/Menu/Menu';
import AuthBar from '@/components/AuthBar/AuthBar';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export interface MenuMobileProps {
  isActive: boolean;
  wrapRef: React.RefObject<HTMLDivElement>;
  menuRef: React.RefObject<HTMLDivElement>;
}

const MenuMobile: React.FC<MenuMobileProps> = ({ isActive, wrapRef, menuRef }) => {
  const isMobile = useMediaQuery('(max-width: 42.5rem)'); // 680px

  return (
    <>
      <div ref={wrapRef} className={clsx(s.menuMobileWrap, isActive && s.open)}>
        <div ref={menuRef} className={s.menuMobile}>
          <Menu />
          {isMobile && <AuthBar />}
        </div>
      </div>
      <div className={clsx(s.overlay, isActive && s.active)} />
    </>
  );
};

export default MenuMobile;
