import {Clock, CurrentDay} from '@/components';
import {InfoList} from '@/components/city-card/info-list';
import {TWeather} from '@/services/api/types';
import {getIconByWeatherCode} from '@/ui-kit/icons/weather-icons/adapters';
import styles from './city-card.module.scss';

export type TProps = {
  weather: TWeather;
};

export const CityCard = ({weather}: TProps) => {
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
  } = weather;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>
        Current weather and forecasts in your city
      </h2>
      <div className={styles.contentWrapper}>
        <div className={styles.skyIcon}>
          {getIconByWeatherCode(iconCode, sunrise)}
        </div>
        <div className={styles.temperature}>
          <span data-deg="°" data-unit="C">
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
          {...{windSpeed: wind.speed, humidity, sunset, sunrise, pressure}}
        />
        <div className={styles.divider}></div>
      </div>
    </div>
  );
};
