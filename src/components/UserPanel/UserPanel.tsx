import { svgIcon } from '@/components/App';
import Button from '@/components/Button/Button';
import s from './UserPanel.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutUser } from '@/store/auth/operations';
import { selectLoading, selectUserName } from '@/store/auth/selectors';

export interface UserPanelProps {}

const UserPanel: React.FC<UserPanelProps> = ({}) => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectLoading);
  const userName = useAppSelector(selectUserName);

  const handleLogout = (): void => {
    dispatch(logoutUser());
  };

  return (
    <div className={s.userPanel}>
      <div className={s.user}>
        <div className={s.iconUserWrap}>
          <svg className={s.iconUser}>
            <use href={`${svgIcon}#icon-user`} />
          </svg>
        </div>
        <span className={s.userName}>{userName}</span>
      </div>
      <Button outline onClick={handleLogout} disabled={loading}>
        {loading ? 'Loading...' : 'Log Out'}
      </Button>
    </div>
  );
};

export default UserPanel;
