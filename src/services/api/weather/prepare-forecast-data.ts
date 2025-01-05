import { TForecast } from '@/types/weather';
import { isItCurrentDayByTimestamps } from '@/utils/is-it-current-day-by-timestamp';

type TPrepareForecastData = (data: Record<string, any>) => Array<TForecast>;

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
