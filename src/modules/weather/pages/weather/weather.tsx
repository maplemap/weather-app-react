import { useEffect, useRef, useState } from 'react';
import { Loader } from '@/ui-kit/loader';
import { CityCard, NoCityFound, SearchBar } from '../../components';
import { useCurrentWeather } from './use-current-weather';
import { useForecast } from './use-forecast';
import styles from './weather.module.scss';

const DEFAULT_CITY = 'London';
const FIVE_MINUTES = 300000;

export const WeatherPage = () => {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [lastDataUpdate, setLastDataUpdate] = useState<Date>(new Date());
  const {
    currentWeather,
    isLoading: currentWeatherLoading,
    getData: getCurrentWeather,
  } = useCurrentWeather(city);
  const {
    forecast,
    isLoading: forecastLoading,
    getData: getForecast,
  } = useForecast(city);
  const firstRender = useRef(true);
  const isLoading = currentWeatherLoading || forecastLoading;

  useEffect(() => {
    const intervalId = setInterval(() => {
      getCurrentWeather();
      getForecast();

      setLastDataUpdate(new Date());
    }, FIVE_MINUTES);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
          />
        )}
        {!currentWeather && !firstRender.current && <NoCityFound />}
      </div>
      {isLoading && <Loader />}
    </>
  );
};
