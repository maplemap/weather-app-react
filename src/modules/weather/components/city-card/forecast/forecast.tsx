import { useState } from 'react';
import { getTempLabel } from '@/modules/weather/components/city-card/utils/get-temp-label';
import { Forecast as ForecastType } from '@/modules/weather/types/weather';
import { Button } from '@/ui-kit/button';
import { getIconByWeatherCode } from '@/ui-kit/icons/weather-icons/adapters';
import { getFormattedDate } from '@/utils/get-formatted-date';
import styles from './forecast.module.scss';

type ForecastDays = 7 | 14;

const FORECAST_DAYS: Record<'LESS' | 'MORE', ForecastDays> = {
  LESS: 7,
  MORE: 14,
};

export type ForecastProps = {
  forecast: Array<ForecastType>;
  units: Units;
};

export const Forecast = ({ forecast, units }: ForecastProps) => {
  const [forecastDays, setForecastDays] = useState<ForecastDays>(7);

  const foreCastData = [...forecast].splice(0, forecastDays);

  const toggleForecastDays = () => {
    setForecastDays(
      forecastDays === FORECAST_DAYS.LESS
        ? FORECAST_DAYS.MORE
        : FORECAST_DAYS.LESS
    );
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>Forecast for {forecastDays} days</h2>
      <div className={styles.list}>
        {foreCastData.map(
          ({
            date,
            currentDay,
            iconCode,
            description,
            dayTemperature,
            nightTemperature,
          }) => (
            <div key={date} className={styles.listItem}>
              <div className={styles.listItemDate}>
                {currentDay ? <strong>Today</strong> : getFormattedDate(date)}
              </div>
              <div>
                <div className={styles.listItemSkyState}>
                  {getIconByWeatherCode(iconCode)}
                </div>
                <div className={styles.listItemTemperature}>
                  <span
                    className={styles.listItemTemperatureData}
                    data-deg='°'
                    data-unit={getTempLabel(units)}
                  >
                    {Math.round(dayTemperature)}
                  </span>
                </div>
                <div
                  className={`${styles.listItemTemperature} ${styles.listItemTemperatureNight}`}
                >
                  <span
                    className={styles.listItemTemperatureData}
                    data-deg='°'
                    data-unit={getTempLabel(units)}
                  >
                    {Math.round(nightTemperature)}
                  </span>
                </div>
                <div className={styles.listItemNaturalPhenomenon}>
                  {description}
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className={styles.more}>
        <Button className={styles.more__button} onClick={toggleForecastDays}>
          {forecastDays === FORECAST_DAYS.MORE ? 'Less' : 'More'}
        </Button>
      </div>
    </div>
  );
};
