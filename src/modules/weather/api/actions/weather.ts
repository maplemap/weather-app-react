import { apiConfig } from '../config';

export const getCurrentWeatherByCity = (city: string) =>
  fetch(
    `${apiConfig.host}/weather?appid=${apiConfig.appId}&q=${city}&units=metric`
  ).then((response) => response.json());
