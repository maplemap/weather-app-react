import { Forecast, Weather } from '@/modules/weather/types/weather';
import { isItCurrentDayByTimestamps } from '@/utils/is-it-current-day-by-timestamp';

type TPreparedCurrentWeatherData = (
  data: Record<string, any>
) => Weather | null;

export const prepareCurrentWeatherData: TPreparedCurrentWeatherData = (
  data
) => {
  if (!data || (data.cod && data.cod === '404')) {
    return null;
  }

  const {
    name: city,
    sys: { sunrise, sunset },
    main: { temp: temperature, humidity, pressure },
    weather: [{ id: iconCode, description }],
    wind: { speed, deg: degree },
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

type TPrepareForecastData = (data: Record<string, any>) => Array<Forecast>;

export const prepareForecastData: TPrepareForecastData = (data) => {
  if (data?.list) {
    const nowTimestamp = Math.floor(Date.now() / 1000);

    return data.list.map((item: Record<string, any>) => {
      const {
        dt: date,
        temp: { day: dayTemperature, night: nightTemperature },
        weather: [{ id: iconCode, description }],
      } = item;

      return {
        currentDay: isItCurrentDayByTimestamps(date, nowTimestamp),
        date,
        iconCode,
        dayTemperature,
        nightTemperature,
        description,
      };
    });
  }

  return [];
};
