import {Outlet} from 'react-router-dom';
import {ErrorBoundary, Header} from '@/components';
import {useAppStore} from '@/services/store';
import {Loader} from '@/ui-kit/loader';
import styles from './primary.module.scss';

export const PrimaryPage = () => {
  const {loading} = useAppStore();

  return (
    <section className={styles.primaryLayout}>
      <ErrorBoundary message="'Header' is not available at this time. Please update">
        <Header />
      </ErrorBoundary>
      <section>
        <main className={styles.content}>
          <ErrorBoundary message="Somehing went wrong. Please update later">
            <Outlet />
          </ErrorBoundary>
        </main>
      </section>
      {loading && <Loader />}
    </section>
  );
};
