import {lazy} from 'react';
import {Navigate} from 'react-router-dom';
import {LoginPage, NotFoundPage, PrimaryPage, SecurePage} from '@/pages';
import {ROUTES} from '@/routes/constants';

const ForecastModule = lazy(() => import('@/modules/forecast'));

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
            element: <ForecastModule />,
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
