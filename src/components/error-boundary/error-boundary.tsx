import React from 'react';
import { ErrorBoundary as ErrorBoundaryComponent } from 'react-error-boundary';
import styles from './error-boundary.module.scss';

const DEFAULT_MESSAGE =
  'Something went wrong. Please update the page now or try again it later.';

export type Props = {
  message?: string;
  children: React.ReactNode;
};

export const ErrorBoundary = ({
  children,
  message = DEFAULT_MESSAGE,
}: Props) => {
  return (
    <ErrorBoundaryComponent
      fallback={<div className={styles.error}>{message}</div>}
    >
      {children}
    </ErrorBoundaryComponent>
  );
};
