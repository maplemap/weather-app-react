import { apiConfig } from '../config';

export const getForecastByCity = (city: string, tempUnit: Units) =>
  fetch(
    `${apiConfig.host}/forecast/daily?q=${city}&appid=${apiConfig.appId}&units=${tempUnit}&cnt=14`
  ).then((response) => response.json());
