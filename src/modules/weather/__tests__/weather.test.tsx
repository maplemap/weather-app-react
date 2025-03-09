import { render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { describe, it, vi, beforeEach, afterEach, expect, Mock } from 'vitest';
import { useAppContext } from '@/services/store/provider';
import { useCurrentWeather } from '../use-current-weather';
import { useForecast } from '../use-forecast';
import { WeatherPage } from '../weather';

vi.mock('@/services/store/provider', () => ({
  useAppContext: vi.fn(),
}));

vi.mock('../use-current-weather', () => ({
  useCurrentWeather: vi.fn(),
}));

vi.mock('../use-forecast', () => ({
  useForecast: vi.fn(),
}));

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react');

  return {
    ...actual,
    useRef: vi.fn().mockReturnValue({ current: true }),
  };
});

describe('WeatherPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useAppContext as Mock).mockReturnValue({ units: 'metric' });

    (useCurrentWeather as Mock).mockReturnValue({
      currentWeather: {
        city: 'London',
        sunrise: 1741329155000,
        sunset: 1741369843000,
        temperature: 16.13,
        humidity: 63,
        pressure: 1011,
        iconCode: 804,
        description: 'overcast clouds',
        wind: {
          speed: 5.14,
          degree: 150,
        },
      },
      isLoading: false,
      lastDataUpdate: new Date(),
    });

    (useForecast as Mock).mockReturnValue({
      forecast: [],
      isLoading: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the SearchBar component', () => {
    render(<WeatherPage />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  describe('when `currentWeather` data was provided', () => {
    it('should render the CityCard component', () => {
      render(<WeatherPage />);

      expect(screen.getByText('London')).toBeInTheDocument();
    });
  });

  describe('when `currentWeather` data was not provided', () => {
    it('should render the NoCityFound component', () => {
      (useRef as Mock).mockReturnValue({ current: null });
      (useCurrentWeather as Mock).mockReturnValue({
        currentWeather: null,
        isLoading: false,
        lastDataUpdate: new Date(),
      });

      render(<WeatherPage />);

      expect(screen.getByText('Sorry but city no found.')).toBeInTheDocument();
    });
  });

  describe('when data is fetching', () => {
    it('should render the Loader component', () => {
      (useCurrentWeather as Mock).mockReturnValue({
        currentWeather: null,
        isLoading: true,
        lastDataUpdate: new Date(),
      });

      render(<WeatherPage />);

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });
});
