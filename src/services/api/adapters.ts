import {useQuery} from 'react-query';
import {getForecastByCity} from './weather/forecast';

export const useFetchForecast = (city: string) => {
  const {data, isError, refetch, isFetching} = useQuery(
    'forecast',
    () => getForecastByCity(city),
    {enabled: false},
  );

  return {
    isLoading: isFetching,
    isError,
    data,
    getData: refetch,
  };
};
