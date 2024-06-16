import {UserBox} from '@/components/user-box';
import {useAuth} from '@/services/auth';
import {DaySunnyIcon} from '@/ui-kit/icons';
import styles from './header.module.scss';

export const Header = () => {
  const {user, logout} = useAuth();

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <a href="/" className={styles.logo}>
          <DaySunnyIcon className={styles.logoIcon} />
        </a>
        <h1 className={styles.brand}>forecast</h1>
        {user && (
          <div className={styles.userBox}>
            <UserBox data={user} logout={logout} />
          </div>
        )}
      </div>
    </div>
  );
};
