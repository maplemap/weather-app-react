import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, afterEach, expect, Mock } from 'vitest';
import { getTempLabel } from '@/modules/weather/components/city-card/utils/get-temp-label';
import { Forecast as ForecastType } from '@/modules/weather/types/weather';
import { getIconByWeatherCode } from '@/ui-kit/icons/weather-icons/adapters';
import { getFormattedDate } from '@/utils/get-formatted-date';
import { CityCard, CityCardProps } from './city-card';
import { getFormattedTime } from './utils/get-formatted-time';

vi.mock('@/components', () => ({
  Clock: () => <div>Mock Clock</div>,
}));

vi.mock('@/modules/weather/components/city-card/utils/get-temp-label', () => ({
  getTempLabel: vi.fn(),
}));

vi.mock('@/ui-kit/icons/weather-icons/adapters', () => ({
  getIconByWeatherCode: vi.fn(),
}));

vi.mock('./utils/get-formatted-time', () => ({
  getFormattedTime: vi.fn(),
}));

const props: CityCardProps = {
  currentWeather: {
    city: 'London',
    sunrise: 1736237066000,
    sunset: 1736266126000,
    temperature: 4.65,
    humidity: 82,
    pressure: 1000,
    iconCode: 803,
    description: 'broken clouds',
    wind: {
      speed: 2.24,
      degree: 314,
    },
  },
  forecast: [],
  lastDataUpdate: new Date(),
  units: 'metric',
};

describe('CityCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (getTempLabel as Mock).mockReturnValue('°C');
    (getIconByWeatherCode as Mock).mockReturnValue(<div>Mock Icon</div>);
    (getFormattedTime as Mock).mockReturnValue('10:30 AM');

    render(<CityCard {...props} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the header', () => {
    expect(
      screen.getByText('Current weather and forecast in your city')
    ).toBeInTheDocument();
  });

  it('should render the update time', () => {
    expect(screen.getByText('last update at:')).toBeInTheDocument();
    expect(screen.getByText('10:30 AM')).toBeInTheDocument();
  });

  it('should render the city name', () => {
    expect(screen.getByText(props.currentWeather.city)).toBeInTheDocument();
  });

  it('should render the temperature', () => {
    expect(
      screen.getByText(Math.round(props.currentWeather.temperature))
    ).toBeInTheDocument();
  });

  it('should render the description', () => {
    expect(
      screen.getByText(props.currentWeather.description)
    ).toBeInTheDocument();
  });

  it('should render the clock component', () => {
    expect(screen.getByText('Mock Clock')).toBeInTheDocument();
  });

  it('should render the weather icon', () => {
    expect(screen.getByText('Mock Icon')).toBeInTheDocument();
  });

  describe('when forecast is available', () => {
    it('should render the Forecast component', () => {
      const forecast: Array<ForecastType> = [
        {
          currentDay: false,
          date: 1110231200,
          iconCode: 616,
          dayTemperature: 3.45,
          nightTemperature: 2.13,
          description: 'rain and snow',
        },
      ];
      const updatedProps: CityCardProps = {
        ...props,
        forecast,
      };

      render(<CityCard {...updatedProps} />);

      expect(
        screen.getByText(getFormattedDate(forecast[0].date))
      ).toBeInTheDocument();
    });
  });
});
