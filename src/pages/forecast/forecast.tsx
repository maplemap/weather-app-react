import {useEffect, useRef, useState} from 'react';
import {CityCard, NoCityFound, SearchBar} from '@/components';
import {useWeather} from '@/pages/forecast/use-weather';
import styles from './forecast.module.scss';

const DEFAULT_CITY = 'London';

export const ForecastPage = () => {
  const [city, setCity] = useState(DEFAULT_CITY);
  const {weather} = useWeather(city);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current && weather) {
      firstRender.current = false;
    }
  }, [weather]);

  return (
    <div>
      <SearchBar onChange={setCity} />
      <div className={styles.content}>
        {weather && <CityCard weather={weather} />}
        {!weather && !firstRender.current && <NoCityFound />}
      </div>
    </div>
  );
};
