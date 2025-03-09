import { Weather } from '@/modules/weather/types/weather';
import { getTime } from '@/utils/get-time';
import { getPressureInMmHg } from '../utils/get-pressure-in-mm-hg';
import { getWindBeaufortScaleByMeterInSecond } from '../utils/get-wind-beufort-scale';
import styles from './info-list.module.scss';

export type InfoListProps = {
  windSpeed: Weather['wind']['speed'];
  humidity: Weather['humidity'];
  pressure: Weather['pressure'];
  sunrise: Weather['sunrise'];
  sunset: Weather['sunset'];
  units: Units;
};

export const InfoList = (props: InfoListProps) => {
  const { windSpeed, sunrise, sunset, humidity, units } = props;
  const windUnits = units === 'metric' ? 'm/s' : 'mil/h';
  const pressureUnits = units === 'metric' ? 'mm/Hg' : 'hPa';
  const pressure =
    units === 'metric' ? getPressureInMmHg(props.pressure) : props.pressure;

  return (
    <div className={styles.info}>
      <div className={styles.infoList}>
        <div className={styles.infoListItem}>
          <strong>Wind:</strong>
          <span>{getWindBeaufortScaleByMeterInSecond(windSpeed)}</span>
        </div>
        <div className={styles.infoListItem}>
          <strong>Wind speed:</strong>
          <span>
            {windSpeed} {windUnits}
          </span>
        </div>
        <div className={styles.infoListItem}>
          <strong>Humidity:</strong>
          <span>{humidity}%</span>
        </div>
      </div>
      <div className={styles.infoList}>
        <div className={styles.infoListItem}>
          <strong>Pressure:</strong>
          <span>
            {pressure} {pressureUnits}
          </span>
        </div>
        <div className={styles.infoListItem}>
          <strong>Sunrise:</strong>
          <span>{getTime(sunrise)}</span>
        </div>
        <div className={styles.infoListItem}>
          <strong>Sunset:</strong>
          <span>{getTime(sunset)}</span>
        </div>
      </div>
    </div>
  );
};
