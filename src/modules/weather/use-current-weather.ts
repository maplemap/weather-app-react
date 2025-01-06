import { useEffect } from 'react';
import { Weather } from '@/modules/weather/types/weather';
import { useFetchCurrentWeather } from './api/adapters';

export type TUseCurrentWeather = (city: string) => {
  currentWeather: Weather | null;
  isLoading: boolean;
  getData: () => void;
};

export const useCurrentWeather: TUseCurrentWeather = (city) => {
  const { data, getData, isLoading } = useFetchCurrentWeather(city);

  useEffect(() => {
    if (city) {
      getData().catch(console.log); // eslint-disable-line no-console
    }
  }, [city, getData]);

  return {
    currentWeather: data,
    isLoading,
    getData,
  };
};
