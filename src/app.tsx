import {useRoutes} from 'react-router-dom';
import {routes as mainRoutes} from '@/routes';
import {ApiProvider} from '@/services/api/provider';
import './styles/main.scss';

export const App = () => {
  return <ApiProvider>{useRoutes(mainRoutes)}</ApiProvider>;
};
