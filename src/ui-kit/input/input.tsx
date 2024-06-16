import React, {useRef} from 'react';
import {generateId} from '@/utils/generate-id';
import styles from './input.module.scss';

export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({label, ...props}: IProps) => {
  const refId = useRef(generateId());

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={refId.current}>
          {label}
        </label>
      )}
      <input id={refId.current} className={styles.input} {...props} />
    </div>
  );
};
