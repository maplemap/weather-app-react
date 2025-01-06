import { WeatherPage } from '@/modules/weather';
import { PrimaryPage } from '@/pages';
import { ApiProvider } from '@/services/api/provider';
import { AppProvider } from '@/services/store/provider';
import './styles/main.scss';

export const App = () => {
  return (
    <AppProvider>
      <ApiProvider>
        <PrimaryPage>
          <WeatherPage />
        </PrimaryPage>
      </ApiProvider>
    </AppProvider>
  );
};
