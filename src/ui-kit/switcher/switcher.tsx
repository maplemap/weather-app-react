import styles from './switcher.module.scss';

type Props = {
  label1: string;
  label2: string;
  onChange: (value: boolean) => void;
};

export const Switcher = ({ label1, label2, onChange }: Props) => (
  <div className={styles.switcher}>
    <span className={styles.label}>{label1}</span>
    <label className={styles.toggle}>
      <input
        role='switcher'
        type='checkbox'
        className={styles.toggleInput}
        onChange={(e) => onChange(e.currentTarget.checked)}
      />
      <span className={styles.toggleSlider}></span>
    </label>
    <span className={styles.label}>{label2}</span>
  </div>
);
