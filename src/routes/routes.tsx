import {Navigate} from 'react-router-dom';
import {
  ForecastPage,
  LoginPage,
  NotFoundPage,
  PrimaryPage,
  SecurePage,
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
            element: <ForecastPage />,
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
