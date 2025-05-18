import clsx from 'clsx';
import s from './NotFoundPage.module.scss';
import Button from '@/components/Button/Button';
import { Link } from 'react-router-dom';

export interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = ({}) => {
  return (
    <div className={clsx(s.notFoundPage, 'container')}>
      <h1 className={s.title}>Ooops... Page is not found!</h1>
      <Link to="/" className={s.link}>
        Go to Home Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
