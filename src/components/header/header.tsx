import { DaySunnyIcon } from '@/ui-kit/icons';
import styles from './header.module.scss';

export const Header = () => (
  <div className={styles.header}>
    <div className={styles.wrapper}>
      <a href='/' className={styles.logo}>
        <DaySunnyIcon className={styles.logoIcon} />
      </a>
      <h1 className={styles.brand}>forecast</h1>
    </div>
  </div>
);
