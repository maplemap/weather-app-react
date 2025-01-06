import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@/services/store/provider';
import { Loader } from '@/ui-kit/loader';
import { CityCard, NoCityFound, SearchBar } from './components';
import { useCurrentWeather } from './use-current-weather';
import { useForecast } from './use-forecast';
import styles from './weather.module.scss';

const DEFAULT_CITY = 'London';

export const WeatherPage = () => {
  const [city, setCity] = useState(DEFAULT_CITY);
  const {
    currentWeather,
    isLoading: currentWeatherLoading,
    lastDataUpdate,
  } = useCurrentWeather(city);
  const { forecast, isLoading: forecastLoading } = useForecast(city);
  const { units } = useAppContext();
  const firstRender = useRef(true);
  const isLoading = currentWeatherLoading || forecastLoading;

  useEffect(() => {
    if (firstRender.current && currentWeather) {
      firstRender.current = false;
    }
  }, [currentWeather]);

  return (
    <>
      <SearchBar onChange={setCity} />
      <div className={styles.content}>
        {currentWeather && (
          <CityCard
            currentWeather={currentWeather}
            forecast={forecast}
            lastDataUpdate={lastDataUpdate}
            units={units}
          />
        )}
        {!currentWeather && !firstRender.current && <NoCityFound />}
      </div>
      {isLoading && <Loader />}
    </>
  );
};
