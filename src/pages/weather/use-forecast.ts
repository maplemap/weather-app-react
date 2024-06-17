import {useEffect} from 'react';
import {useFetchForecast} from '@/services/api';
import {TForecast} from '@/services/api/types';

export type TUseForecast = (city: string) => {
  forecast: Array<TForecast>;
  isLoading: boolean;
};

export const useForecast: TUseForecast = (city) => {
  const {data, getData, isLoading} = useFetchForecast(city);

  useEffect(() => {
    if (city) {
      getData().catch(console.log); // eslint-disable-line no-console
    }
  }, [city, getData]);

  return {
    forecast: data,
    isLoading,
  };
};
