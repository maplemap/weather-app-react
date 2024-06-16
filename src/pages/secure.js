import {useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {ROUTES} from '@/routes/constants';
import {useAuth} from '@/services/auth';

export const SecurePage = () => {
  const navigate = useNavigate();
  const {user} = useAuth();

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
    }
  }, [navigate, user]);

  if (!user) {
    return null;
  }

  return <Outlet />;
};
