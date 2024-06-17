import {useEffect, useRef, useState} from 'react';
import {CityCard, NoCityFound, SearchBar} from '@/components';
import {useForecast} from '@/pages/weather/use-forecast';
import {Loader} from '@/ui-kit/loader';
import {useCurrentWeather} from './use-current-weather';
import styles from './weather.module.scss';

const DEFAULT_CITY = 'London';

export const WeatherPage = () => {
  const [city, setCity] = useState(DEFAULT_CITY);
  const {currentWeather, isLoading: currentWeatherLoading} =
    useCurrentWeather(city);
  const {forecast, isLoading: forecastLoading} = useForecast(city);
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
          <CityCard currentWeather={currentWeather} forecast={forecast} />
        )}
        {!currentWeather && !firstRender.current && <NoCityFound />}
      </div>
      {isLoading && <Loader />}
    </>
  );
};
