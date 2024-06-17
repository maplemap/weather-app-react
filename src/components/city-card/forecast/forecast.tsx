import {TForecast} from '@/services/api/types';
import {getIconByWeatherCode} from '@/ui-kit/icons/weather-icons/adapters';
import {getFormattedDate} from '@/utils/get-formatted-date';
import styles from './forecast.module.scss';

export type TForecastProps = {
  forecast: Array<TForecast>;
};

export const Forecast = ({forecast}: TForecastProps) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>Forecast for 7 days</h2>
      <ul className={styles.list}>
        {forecast.map(
          ({
            date,
            currentDay,
            iconCode,
            description,
            dayTemperature,
            nightTemperature,
          }) => (
            <li key={date} className={styles.listItem}>
              <div className={styles.listItemDate}>
                {currentDay ? <strong>Today</strong> : getFormattedDate(date)}
              </div>
              <div className={styles.listItemSkyState}>
                {getIconByWeatherCode(iconCode)}
              </div>
              <div className={styles.listItemTemperature}>
                <span
                  className={styles.listItemTemperatureData}
                  data-deg="°"
                  data-unit="C"
                >
                  {Math.round(dayTemperature)}
                </span>
              </div>
              <div
                className={`${styles.listItemTemperature} ${styles.listItemTemperatureNight}`}
              >
                <span
                  className={styles.listItemTemperatureData}
                  data-deg="°"
                  data-unit="C"
                >
                  {Math.round(nightTemperature)}
                </span>
              </div>
              <div className={styles.listItemNaturalPhenomenon}>
                {description}
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};
