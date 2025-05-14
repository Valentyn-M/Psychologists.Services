import React from 'react';
import Button from '../Button/Button';
import { svgIcon } from '../App';

export interface UserMenuProps {}

const UserMenu: React.FC<UserMenuProps> = ({}) => {
  return (
    <>
      <button type="button">
        <svg>
          <use href={`${svgIcon}#icon-user`} />
        </svg>
        <span>User Name</span>
      </button>
      <Button outline>Log Out</Button>
    </>
  );
};

export default UserMenu;
