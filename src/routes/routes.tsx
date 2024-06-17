import {Navigate} from 'react-router-dom';
import {
  LoginPage,
  NotFoundPage,
  PrimaryPage,
  SecurePage,
  WeatherPage,
} from '@/pages';
import {ROUTES} from '@/routes/constants';

export const routes = [
  {
    element: <PrimaryPage />,
    children: [
      {
        element: <SecurePage />,
        children: [
          {
            path: ROUTES.BASE,
            exact: true,
            element: <WeatherPage />,
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
      },
      {
        path: '*',
        element: <Navigate to={ROUTES.NOT_FOUND} />,
      },
    ],
  },
];
