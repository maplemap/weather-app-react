import {useEffect, useState} from 'react';
import {useFetchCurrentWeather} from '@/services/api';
import {TWeather} from '@/services/api/types';
import {useAppStore} from '@/services/store';

export const useCurrentWeather = (city: string) => {
  const [currentWeather, setCurrentWeather] = useState<TWeather | null>(null);
  const {setLoading} = useAppStore();
  const {data, getData, isLoading} = useFetchCurrentWeather(city);

  useEffect(() => {
    if (data) {
      setCurrentWeather(data);
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
    currentWeather,
  };
};
