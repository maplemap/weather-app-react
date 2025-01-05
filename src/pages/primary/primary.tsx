import { ReactNode } from 'react';
import { ErrorBoundary, Header } from '@/components';
import styles from './primary.module.scss';

type PrimaryPageProps = {
  children: ReactNode;
};

export const PrimaryPage = ({ children }: PrimaryPageProps) => (
  <section className={styles.primaryLayout}>
    <ErrorBoundary message="'Header' is not available at this time. Please update">
      <Header />
    </ErrorBoundary>
    <section>
      <main className={styles.content}>
        <ErrorBoundary message='Somehing went wrong. Please update later'>
          {children}
        </ErrorBoundary>
      </main>
    </section>
  </section>
);
