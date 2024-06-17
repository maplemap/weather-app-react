import {Outlet} from 'react-router-dom';
import {ErrorBoundary, Header} from '@/components';
import styles from './primary.module.scss';

export const PrimaryPage = () => (
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
  </section>
);
