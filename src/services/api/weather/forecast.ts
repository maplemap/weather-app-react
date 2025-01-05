import { apiConfig } from './config';

export const getForecastByCity = (city: string) =>
  fetch(
    `${apiConfig.host}/forecast/daily?q=${city}&appid=${apiConfig.appId}&units=metric&cnt=14`
  ).then((response) => response.json());
