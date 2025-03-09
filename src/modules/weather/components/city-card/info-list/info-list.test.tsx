import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import { getTime } from '@/utils/get-time';
import { getPressureInMmHg } from '../utils/get-pressure-in-mm-hg';
import { getWindBeaufortScaleByMeterInSecond } from '../utils/get-wind-beufort-scale';
import { InfoList, InfoListProps } from './info-list';

const props: InfoListProps = {
  windSpeed: 4.63,
  humidity: 82,
  sunset: 1736266126000,
  sunrise: 1736237066000,
  pressure: 1001,
  units: 'metric',
};

describe('InfoList Component', () => {
  beforeEach(() => {
    render(<InfoList {...props} />);
  });

  it('should render the wind speed in Beaufort scale', () => {
    expect(
      screen.getByText(getWindBeaufortScaleByMeterInSecond(props.windSpeed))
    ).toBeInTheDocument();
  });

  it('should render the wind speed with `m/s`', () => {
    expect(screen.getByText(`${props.windSpeed} m/s`)).toBeInTheDocument();
  });

  it('should render the humidity', () => {
    expect(screen.getByText(`${props.humidity}%`)).toBeInTheDocument();
  });

  it('should render the pressure with `mm/Hg`', () => {
    expect(
      screen.getByText(`${getPressureInMmHg(props.pressure)} mm/Hg`)
    ).toBeInTheDocument();
  });

  it('should render the sunrise time', () => {
    expect(screen.getByText(getTime(props.sunrise))).toBeInTheDocument();
  });

  it('should render the sunset time', () => {
    expect(screen.getByText(getTime(props.sunset))).toBeInTheDocument();
  });

  describe('when `units` is equal to `imperial`', () => {
    beforeEach(() => {
      render(
        <InfoList
          {...{
            ...props,
            units: 'imperial',
          }}
        />
      );
    });

    it('should render the wind speed with `mil/h`', () => {
      expect(screen.getByText(`${props.windSpeed} mil/h`)).toBeInTheDocument();
    });

    it('should render the pressure with `hPa`', () => {
      expect(screen.getByText(`${props.pressure} hPa`)).toBeInTheDocument();
    });
  });
});
