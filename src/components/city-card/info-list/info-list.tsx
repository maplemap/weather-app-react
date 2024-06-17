import {getPressureInMmHg} from '@/components/city-card/utils/get-pressure-in-mm-hg';
import {getWindBeaufortScaleByMeterInSecond} from '@/components/city-card/utils/get-wind-beufort-scale';
import {TWeather} from '@/services/api/types';
import {getTime} from '@/utils/get-time';
import styles from './info-list.module.scss';

export type TInfoListProps = {
  windSpeed: TWeather['wind']['speed'];
  humidity: TWeather['humidity'];
  pressure: TWeather['pressure'];
  sunrise: TWeather['sunrise'];
  sunset: TWeather['sunset'];
};

export const InfoList = ({
  windSpeed,
  sunrise,
  sunset,
  pressure,
  humidity,
}: TInfoListProps) => (
  <div className={styles.info}>
    <div className={styles.infoList}>
      <div className={styles.infoListItem}>
        <strong>Wind:</strong>
        <span>{getWindBeaufortScaleByMeterInSecond(windSpeed)}</span>
      </div>
      <div className={styles.infoListItem}>
        <strong>Wind speed:</strong>
        <span>{windSpeed} m/s</span>
      </div>
      <div className={styles.infoListItem}>
        <strong>Humidity:</strong>
        <span>{humidity}%</span>
      </div>
    </div>
    <div className={styles.infoList}>
      <div className={styles.infoListItem}>
        <strong>Pressure:</strong>
        <span>{getPressureInMmHg(pressure)} mm/Hg</span>
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
