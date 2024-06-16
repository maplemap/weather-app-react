import {TUser} from '@/types/user';
import styles from './user-box.module.scss';

export type TProps = {
  data: TUser;
  logout: () => void;
};

export const UserBox = ({data, logout}: TProps) => {
  const {email} = data;

  return (
    <div className={styles.wrapper}>
      <div className={styles.email}>{email}</div>
      <ul className={styles.menu}>
        <li className={styles.menuItem} onClick={logout}>
          logout
        </li>
      </ul>
    </div>
  );
};
