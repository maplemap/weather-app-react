import {useEffect, useRef, useState} from 'react';
import {NoCityFound} from '@/components/no-city-found';
import {SearchBar} from '@/components/search-bar';
import {useForecast} from '@/pages/forecast/useForecast';
import styles from './forecast.module.scss';

const DEFAULT_CITY = 'London';

export const ForecastPage = () => {
  const [city, setCity] = useState(DEFAULT_CITY);
  const {forecast} = useForecast(city);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current && forecast) {
      firstRender.current = false;
    }
  }, [forecast]);

  return (
    <div>
      <SearchBar onChange={setCity} />
      <div className={styles.content}>
        {forecast && <>Forecast</>}
        {!forecast && !firstRender.current && <NoCityFound />}
      </div>
    </div>
  );
};
