import React, {FormEvent, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '@/routes/constants';
import {useAuth} from '@/services/auth';
import {Button} from '@/ui-kit/button';
import {Input} from '@/ui-kit/input';
import styles from './login.module.scss';

export const LoginPage = () => {
  const {user, login} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(ROUTES.BASE);
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');

    if (typeof email === 'string') {
      login({email});
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={onSubmitForm}>
        <Input label="Email" name="email" type="email" />
        <div className={styles.buttonWrapper}>
          <Button type="submit" disabled={false}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
