import {TWeatherIconCode} from '@/ui-kit/icons/weather-icons/types';

export type TWeather = {
  city: string;
  description: string;
  sunrise: number;
  sunset: number;
  temperature: number;
  humidity: number;
  pressure: number;
  iconCode: TWeatherIconCode;
  wind: {
    speed: number;
    degree: number;
  };
};

export type TForecast = {
  currentDay: boolean;
  date: number;
  iconCode: TWeatherIconCode;
  dayTemperature: number;
  nightTemperature: number;
  description: string;
};
