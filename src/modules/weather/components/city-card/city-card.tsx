import { Clock } from '@/components';
import { TForecast, TWeather } from '@/types/weather';
import { getIconByWeatherCode } from '@/ui-kit/icons/weather-icons/adapters';
import { CurrentDay } from '../../components';
import styles from './city-card.module.scss';
import { Forecast } from './forecast';
import { InfoList } from './info-list';
import { getFormattedTime } from './utils/get-formatted-time';

export type TProps = {
  currentWeather: TWeather;
  forecast: Array<TForecast>;
  lastDataUpdate: Date;
};

export const CityCard = ({
  currentWeather,
  forecast,
  lastDataUpdate,
}: TProps) => {
  const {
    city,
    temperature,
    iconCode,
    sunrise,
    description,
    wind,
    humidity,
    sunset,
    pressure,
  } = currentWeather;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>
        Current weather and forecast in your city
      </h2>
      <div className={styles.contentWrapper}>
        <div className={styles.updateTime}>
          last update at:
          <span>{getFormattedTime(lastDataUpdate)}</span>
        </div>
        <div className={styles.skyIcon}>
          {getIconByWeatherCode(iconCode, sunrise)}
        </div>
        <div className={styles.temperature}>
          <span data-deg='°' data-unit='C'>
            {Math.round(temperature)}
          </span>
        </div>
        <div className={styles.cityName}>
          <div className={styles.skyState_cityName}>{city}</div>
          <div className={styles.skyState}>{description}</div>
        </div>
        <div className={styles.dateTime}>
          <span className={styles.clock}>
            <Clock />
          </span>
          <span className={styles.date}>
            <CurrentDay />
          </span>
        </div>
        <div className={styles.divider}></div>
        <InfoList
          {...{ windSpeed: wind.speed, humidity, sunset, sunrise, pressure }}
        />
        <div className={styles.divider}></div>
        {forecast.length > 0 && <Forecast forecast={forecast} />}
      </div>
    </div>
  );
};
