import {TWeather} from '@/services/api/types';

type TPreparedCurrentWeatherData = (
  data: Record<string, any>,
) => TWeather | null;

export const prepareCurrentWeatherData: TPreparedCurrentWeatherData = (
  data,
) => {
  if (
    !data ||
    (Object.prototype.hasOwnProperty.call(data, 'cod') && data.cod === '404')
  ) {
    return null;
  }

  const {
    name: city,
    sys: {sunrise, sunset},
    main: {temp: temperature, humidity, pressure},
    weather: [{id: iconCode, description}],
    wind: {speed, deg: degree},
  } = data;

  return {
    city,
    sunrise: sunrise * 1000,
    sunset: sunset * 1000,
    temperature,
    humidity,
    pressure,
    iconCode,
    description,
    wind: {
      speed,
      degree,
    },
  };
};
