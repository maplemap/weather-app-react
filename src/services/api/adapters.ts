import {useMemo} from 'react';
import {useQuery} from 'react-query';
import {getForecastByCity} from '@/services/api/weather/forecast';
import {prepareCurrentWeatherData} from '@/services/api/weather/prepare-current-weather-data';
import {prepareForecastData} from '@/services/api/weather/prepare-forecast-data';
import {getCurrentWeatherByCity} from './weather';

export const useFetchCurrentWeather = (city: string) => {
  const {data, isError, refetch, isFetching} = useQuery(
    'current-weather',
    () => getCurrentWeatherByCity(city),
    {enabled: false},
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
  const {data, isError, refetch, isFetching} = useQuery(
    'forecast',
    () => getForecastByCity(city),
    {enabled: false},
  );

  const preparedData = useMemo(() => prepareForecastData(data), [data]);

  return {
    isLoading: isFetching,
    isError,
    data: preparedData,
    getData: refetch,
  };
};
