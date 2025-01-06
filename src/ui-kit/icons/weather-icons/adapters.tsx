import React from 'react';
import { TWeatherIconCode } from '@/ui-kit/icons/weather-icons/types';
import { WI_DATA_BY_CODE } from './constants';

type GetIconByWeatherCode = (
  code: TWeatherIconCode,
  sunsetTimestamp?: number
) => React.ReactElement;

export const getIconByWeatherCode: GetIconByWeatherCode = (
  code,
  sunsetTimestamp = 0
) => {
  const classPrefix = 'wi wi-';
  let iconClassname = WI_DATA_BY_CODE[code].icon;
  let dayPrefix = '';

  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    const dateNowTimestamp = Math.round(Date.now() / 1000);
    dayPrefix =
      sunsetTimestamp && dateNowTimestamp > sunsetTimestamp ? 'night-' : 'day-';

    if (
      sunsetTimestamp &&
      dateNowTimestamp > sunsetTimestamp &&
      iconClassname === 'sunny'
    ) {
      dayPrefix = 'night-clear';
      iconClassname = '';
    }
  }

  return <span className={`${classPrefix}${dayPrefix}${iconClassname}`} />;
};
