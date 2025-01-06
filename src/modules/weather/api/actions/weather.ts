import { apiConfig } from '../config';

export const getCurrentWeatherByCity = (city: string, tempUnit: Units) =>
  fetch(
    `${apiConfig.host}/weather?appid=${apiConfig.appId}&q=${city}&units=${tempUnit}`
  ).then((response) => response.json());
