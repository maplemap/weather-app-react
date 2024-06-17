import {useEffect} from 'react';
import {useFetchCurrentWeather} from '@/services/api';
import {TWeather} from '@/services/api/types';

export type TUseCurrentWeather = (city: string) => {
  currentWeather: TWeather | null;
  isLoading: boolean;
};

export const useCurrentWeather: TUseCurrentWeather = (city) => {
  const {data, getData, isLoading} = useFetchCurrentWeather(city);

  useEffect(() => {
    if (city) {
      getData().catch(console.log); // eslint-disable-line no-console
    }
  }, [city, getData]);

  return {
    currentWeather: data,
    isLoading,
  };
};
