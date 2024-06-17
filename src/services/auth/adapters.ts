import {useCallback} from 'react';
import {useAppStore} from '@/services/store';
import {TUser} from '@/types/user';

export const useAuth = () => {
  const {user, setUser, deleteUser} = useAppStore();

  const login = useCallback(
    (user: TUser) => {
      setUser(user);
    },
    [setUser],
  );

  const logout = useCallback(() => {
    deleteUser();
  }, [deleteUser]);

  return {login, logout, user};
};
