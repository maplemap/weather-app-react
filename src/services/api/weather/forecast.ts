import {apiConfig} from './config';

export const getForecastByCity = (city: string) =>
  fetch(
    `${apiConfig.host}/forecast/daily?q=${city}&appid=${apiConfig.appId}&units=metric&cnt=7`,
  ).then((response) => response.json());
