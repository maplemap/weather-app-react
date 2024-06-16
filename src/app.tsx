import {useRoutes} from 'react-router-dom';
import {routes as mainRoutes} from '@/routes';
import './styles/main.scss';

export const App = () => {
  return useRoutes(mainRoutes);
};
