import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { getForecastByCity } from './actions/forecast';
import { getCurrentWeatherByCity } from './actions/weather';
import { prepareCurrentWeatherData, prepareForecastData } from './utils';

export const useFetchCurrentWeather = (city: string) => {
  const { data, isError, refetch, isFetching } = useQuery(
    'current-weather',
    () => getCurrentWeatherByCity(city),
    { enabled: false }
  );

  const preparedData = useMemo(() => prepareCurrentWeatherData(data), [data]);

  return {
    isLoading: isFetching,
    isError,
    data: preparedData,
    getData: refetch,
  };
};

export const useFetchForecast = (city: string) => {
  const { data, isError, refetch, isFetching } = useQuery(
    'forecast',
    () => getForecastByCity(city),
    { enabled: false }
  );

  const preparedData = useMemo(() => prepareForecastData(data), [data]);

  return {
    isLoading: isFetching,
    isError,
    data: preparedData,
    getData: refetch,
  };
};
