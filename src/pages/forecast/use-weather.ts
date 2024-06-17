import {useEffect, useState} from 'react';
import {useFetchWeather} from '@/services/api';
import {TWeather} from '@/services/api/types';
import {useAppStore} from '@/services/store';

export const useWeather = (city: string) => {
  const [weather, setWeather] = useState<TWeather | null>(null);
  const {setLoading} = useAppStore();
  const {data, getData, isLoading} = useFetchWeather(city);

  useEffect(() => {
    if (data) {
      setWeather(data);
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
    weather,
  };
};
