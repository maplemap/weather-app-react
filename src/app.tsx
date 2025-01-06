import { WeatherPage } from '@/modules/weather';
import { PrimaryPage } from '@/pages';
import { ApiProvider } from '@/services/api/provider';
import './styles/main.scss';

export const App = () => {
  return (
    <ApiProvider>
      <PrimaryPage>
        <WeatherPage />
      </PrimaryPage>
    </ApiProvider>
  );
};
