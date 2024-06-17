import {useEffect, useRef, useState} from 'react';
import {CityCard, NoCityFound, SearchBar} from '@/components';
import {useCurrentWeather} from './use-current-weather';
import styles from './weather.module.scss';

const DEFAULT_CITY = 'London';

export const WeatherPage = () => {
  const [city, setCity] = useState(DEFAULT_CITY);
  const {currentWeather} = useCurrentWeather(city);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current && currentWeather) {
      firstRender.current = false;
    }
  }, [currentWeather]);

  return (
    <div>
      <SearchBar onChange={setCity} />
      <div className={styles.content}>
        {currentWeather && <CityCard currentWeather={currentWeather} />}
        {!currentWeather && !firstRender.current && <NoCityFound />}
      </div>
    </div>
  );
};
