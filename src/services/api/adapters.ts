import {useMemo} from 'react';
import {useQuery} from 'react-query';
import {prepareWeatherData} from '@/services/api/weather/prepare-weather-data';
import {getWeatherByCity} from './weather';

export const useFetchWeather = (city: string) => {
  const {data, isError, refetch, isFetching} = useQuery(
    'forecast',
    () => getWeatherByCity(city),
    {enabled: false},
  );

  const preparedData = useMemo(() => prepareWeatherData(data), [data]);

  return {
    isLoading: isFetching,
    isError,
    data: preparedData,
    getData: refetch,
  };
};
