import { Clock } from '@/components';
import { getTempLabel } from '@/modules/weather/components/city-card/utils/get-temp-label';
import {
  Forecast as ForecastType,
  Weather,
} from '@/modules/weather/types/weather';
import { getIconByWeatherCode } from '@/ui-kit/icons/weather-icons/adapters';
import { CurrentDay } from '../../components';
import styles from './city-card.module.scss';
import { Forecast } from './forecast';
import { InfoList } from './info-list';
import { getFormattedTime } from './utils/get-formatted-time';

export type CityCardProps = {
  currentWeather: Weather;
  forecast: Array<ForecastType>;
  lastDataUpdate: Date;
  units: Units;
};

export const CityCard = (props: CityCardProps) => {
  const { currentWeather, forecast, lastDataUpdate, units } = props;
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
          <span data-deg='°' data-unit={getTempLabel(units)}>
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
          {...{
            windSpeed: wind.speed,
            humidity,
            sunset,
            sunrise,
            pressure,
            units,
          }}
        />
        <div className={styles.divider}></div>
        {forecast.length > 0 && <Forecast forecast={forecast} units={units} />}
      </div>
    </div>
  );
};
