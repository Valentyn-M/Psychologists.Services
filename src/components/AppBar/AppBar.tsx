import s from './AppBar.module.scss';
import clsx from 'clsx';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Logo from '@/components/Logo/Logo';
import AuthBar from '@/components/AuthBar/AuthBar';
import Menu from '@/components/Menu/Menu';
import { useEffect, useRef, useState } from 'react';
import MenuMobileBtn from '@/components/MenuMobileBtn/MenuMobileBtn';
import MenuMobile from '@/components/MenuMobile/MenuMobile';

export interface AppBarProps {}

const AppBar: React.FC<AppBarProps> = ({}) => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const handleActivateMobileMenu = (): void => {
    setIsMobileMenuActive((prev) => !prev);
  };

  const isTablet = useMediaQuery('(max-width: 56.25rem)'); // 900px
  const isMobile = useMediaQuery('(max-width: 40.5rem)'); // 648px

  const btnRef = useRef<HTMLButtonElement>(null);
  const menuWrapRef = useRef<HTMLDivElement>(null!);
  const menuRef = useRef<HTMLDivElement>(null!);

  // Закриття мобільного меню по кліку за його межами
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      const clickedInsideMenu = menuRef.current?.contains(target);
      const clickedInsideWrap = menuWrapRef.current?.contains(target);
      const clickedButton = btnRef.current?.contains(target);

      if (isMobileMenuActive && !clickedButton && (clickedInsideMenu || !clickedInsideWrap)) {
        setIsMobileMenuActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuActive]);

  return (
    <div className={clsx(s.appBarWrap, 'container')}>
      <Logo />
      {!isTablet && <Menu />}
      {!isMobile && <AuthBar />}
      {isTablet && (
        <MenuMobileBtn ref={btnRef} isActive={isMobileMenuActive} handleActivate={handleActivateMobileMenu} />
      )}
      {isTablet && <MenuMobile isActive={isMobileMenuActive} wrapRef={menuWrapRef} menuRef={menuRef} />}
    </div>
  );
};

export default AppBar;
