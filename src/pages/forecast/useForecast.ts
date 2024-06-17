import {useEffect, useState} from 'react';
import {useFetchForecast} from '@/services/api';
import {useAppStore} from '@/services/store';

enum CODE {
  NOT_FOUND = '404',
}

export const useForecast = (city: string) => {
  const [forecast, setForecast] = useState(null);
  const {setLoading} = useAppStore();
  const {data, getData, isLoading} = useFetchForecast(city);

  useEffect(() => {
    if (data) {
      const newData = data.cod === CODE.NOT_FOUND ? null : data;
      setForecast(newData);
    }
  }, [data]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (city) {
      getData().catch(console.log); // eslint-disable-line no-console
    }
  }, [city, getData]);

  return {
    forecast,
  };
};
