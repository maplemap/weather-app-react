import {useMemo} from 'react';
import {useQuery} from 'react-query';
import {prepareCurrentWeatherData} from '@/services/api/weather/prepare-current-weather-data';
import {getCurrentWeatherByCity} from './weather';

export const useFetchCurrentWeather = (city: string) => {
  const {data, isError, refetch, isFetching} = useQuery(
    'forecast',
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
