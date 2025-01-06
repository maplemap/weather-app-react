import { useCallback, useEffect } from 'react';
import { useAppContext } from '@/services/store/provider';
import { useFetchForecast } from './api/adapters';
import { Forecast } from './types/weather';

const DATA_UPDATE_INTERVAL = 5 * 60 * 1000;

export type TUseForecast = (city: string) => {
  forecast: Array<Forecast>;
  isLoading: boolean;
  getData: () => void;
};

export const useForecast: TUseForecast = (city) => {
  const { units } = useAppContext();
  const { data, getData, isLoading } = useFetchForecast(city, units);

  const getCurrentData = useCallback(() => {
    if (city) {
      getData().catch(console.log); // eslint-disable-line no-console
    }
  }, [city, getData]);

  useEffect(() => {
    getCurrentData();
  }, [getCurrentData, units]);

  useEffect(() => {
    getCurrentData();

    const intervalId = setInterval(() => {
      getCurrentData();
    }, DATA_UPDATE_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [getData, getCurrentData]);

  return {
    forecast: data,
    isLoading,
    getData,
  };
};
