import React from 'react';
import {ErrorBoundary as ErrorBoundaryComponent} from 'react-error-boundary';
import {useLocation} from 'react-router-dom';
import styles from './error-boundary.module.scss';

const DEFAULT_MESSAGE =
  'Something went wrong. Please update the page now or try again it later.';

export type TProps = {
  message?: string;
  children: React.ReactNode;
};

export const ErrorBoundary = ({
  children,
  message = DEFAULT_MESSAGE,
}: TProps) => {
  const location = useLocation();

  return (
    <ErrorBoundaryComponent
      key={location.pathname}
      fallback={<div className={styles.error}>{message}</div>}
    >
      {children}
    </ErrorBoundaryComponent>
  );
};
