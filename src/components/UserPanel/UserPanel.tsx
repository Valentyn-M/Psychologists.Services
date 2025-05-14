import { svgIcon } from '@/components/App';
import Button from '@/components/Button/Button';
import s from './UserPanel.module.scss';

export interface UserPanelProps {}

const UserPanel: React.FC<UserPanelProps> = ({}) => {
  return (
    <>
      <button type="button">
        <svg className={s.iconUser}>
          <use href={`${svgIcon}#icon-user`} />
        </svg>
        <span>User Name</span>
      </button>
      <Button outline>Log Out</Button>
    </>
  );
};

export default UserPanel;
