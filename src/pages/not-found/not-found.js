import {useNavigate} from 'react-router-dom';
import styles from './not-found.module.scss';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.layout}>
      <span>Page Not Found</span>
      <div className={styles.back} data-testid="back-link">
        Click&nbsp;
        <a className={styles.backLink} onClick={() => navigate(-1)}>
          here
        </a>
        &nbsp; to back on previous page
      </div>
    </div>
  );
};
