import { useState } from 'react';
import { Forecast as ForecastType } from '@/modules/weather/types/weather';
import { Button } from '@/ui-kit/button';
import { getIconByWeatherCode } from '@/ui-kit/icons/weather-icons/adapters';
import { getFormattedDate } from '@/utils/get-formatted-date';
import styles from './forecast.module.scss';

export type ForecastProps = {
  forecast: Array<ForecastType>;
};

export const Forecast = ({ forecast }: ForecastProps) => {
  const [showMore, setShowMore] = useState(false);

  const foreCastData = showMore ? forecast : [...forecast].splice(0, 7);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>Forecast for {showMore ? 14 : 7} days</h2>
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
              <div className={styles.listItemSkyState}>
                {getIconByWeatherCode(iconCode)}
              </div>
              <div className={styles.listItemTemperature}>
                <span
                  className={styles.listItemTemperatureData}
                  data-deg='°'
                  data-unit='C'
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
                  data-unit='C'
                >
                  {Math.round(nightTemperature)}
                </span>
              </div>
              <div className={styles.listItemNaturalPhenomenon}>
                {description}
              </div>
            </div>
          )
        )}
      </div>
      <div className={styles.more}>
        <Button
          className={styles.more__button}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'Less' : 'More'}
        </Button>
      </div>
    </div>
  );
};
