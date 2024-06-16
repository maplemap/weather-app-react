import React, {useRef} from 'react';
import {generateId} from '@/utils/generate-id';
import styles from './input.module.scss';

export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  getRef?: (input: HTMLInputElement | null) => void;
}

export const Input = ({label, className, getRef, ...props}: IProps) => {
  const refId = useRef(generateId());

  const getReference = (input: HTMLInputElement | null) => {
    if (getRef) {
      getRef(input);
    }
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={refId.current}>
          {label}
        </label>
      )}
      <input
        ref={getReference}
        id={refId.current}
        className={`${styles.input} ${className}`}
        {...props}
      />
    </div>
  );
};
