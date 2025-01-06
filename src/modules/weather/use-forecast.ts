import { useEffect } from 'react';
import { useFetchForecast } from './api/adapters';
import { Forecast } from './types/weather';

export type TUseForecast = (city: string) => {
  forecast: Array<Forecast>;
  isLoading: boolean;
  getData: () => void;
};

export const useForecast: TUseForecast = (city) => {
  const { data, getData, isLoading } = useFetchForecast(city);

  useEffect(() => {
    if (city) {
      getData().catch(console.log); // eslint-disable-line no-console
    }
  }, [city, getData]);

  return {
    forecast: data,
    isLoading,
    getData,
  };
};
