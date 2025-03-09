import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, afterEach, expect, Mock } from 'vitest';
import { getTempLabel } from '@/modules/weather/components/city-card/utils/get-temp-label';
import { Forecast as ForecastType } from '@/modules/weather/types/weather';
import { getIconByWeatherCode } from '@/ui-kit/icons/weather-icons/adapters';
import { getFormattedDate } from '@/utils/get-formatted-date';
import { userEvent } from '@testing-library/user-event';
import { Forecast } from './forecast';

vi.mock('@/modules/weather/components/city-card/utils/get-temp-label', () => ({
  getTempLabel: vi.fn(),
}));

vi.mock('@/ui-kit/icons/weather-icons/adapters', () => ({
  getIconByWeatherCode: vi.fn(),
}));

vi.mock('@/utils/get-formatted-date', () => ({
  getFormattedDate: vi.fn(),
}));

const mockForecast: Array<ForecastType> = [
  {
    currentDay: true,
    date: 1736251200,
    iconCode: 616,
    dayTemperature: 3.45,
    nightTemperature: 2.13,
    description: 'rain and snow',
  },
  {
    currentDay: false,
    date: 1736337600,
    iconCode: 601,
    dayTemperature: 3.63,
    nightTemperature: 1.36,
    description: 'snow',
  },
  {
    currentDay: false,
    date: 1736424000,
    iconCode: 800,
    dayTemperature: 2.32,
    nightTemperature: 0.41,
    description: 'sky is clear',
  },
  {
    currentDay: false,
    date: 1736510400,
    iconCode: 616,
    dayTemperature: 0.93,
    nightTemperature: 1.94,
    description: 'rain and snow',
  },
  {
    currentDay: false,
    date: 1736596800,
    iconCode: 500,
    dayTemperature: 3.84,
    nightTemperature: 1.82,
    description: 'light rain',
  },
  {
    currentDay: false,
    date: 1736683200,
    iconCode: 802,
    dayTemperature: 2.8,
    nightTemperature: 0.97,
    description: 'scattered clouds',
  },
  {
    currentDay: false,
    date: 1736769600,
    iconCode: 803,
    dayTemperature: 4.16,
    nightTemperature: 2.77,
    description: 'broken clouds',
  },
  {
    currentDay: false,
    date: 1736856000,
    iconCode: 804,
    dayTemperature: 6.74,
    nightTemperature: 5.84,
    description: 'overcast clouds',
  },
  {
    currentDay: false,
    date: 1736942400,
    iconCode: 800,
    dayTemperature: 6.12,
    nightTemperature: 6.27,
    description: 'sky is clear',
  },
  {
    currentDay: false,
    date: 1737028800,
    iconCode: 802,
    dayTemperature: 6.19,
    nightTemperature: 3.63,
    description: 'scattered clouds',
  },
  {
    currentDay: false,
    date: 1737115200,
    iconCode: 800,
    dayTemperature: 5.94,
    nightTemperature: 3.43,
    description: 'sky is clear',
  },
  {
    currentDay: false,
    date: 1737201600,
    iconCode: 800,
    dayTemperature: 6.49,
    nightTemperature: 3.44,
    description: 'sky is clear',
  },
  {
    currentDay: false,
    date: 1737288000,
    iconCode: 800,
    dayTemperature: 6.36,
    nightTemperature: 7.61,
    description: 'sky is clear',
  },
  {
    currentDay: false,
    date: 1737374400,
    iconCode: 804,
    dayTemperature: 6.83,
    nightTemperature: 7.48,
    description: 'overcast clouds',
  },
];

describe('Forecast component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (getTempLabel as Mock).mockReturnValue('°C');
    (getIconByWeatherCode as Mock).mockReturnValue(<div>Mock Icon</div>);
    (getFormattedDate as Mock).mockImplementation((date) =>
      new Date(date).toDateString()
    );

    render(<Forecast forecast={mockForecast} units='metric' />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the header with "7 days" by default', () => {
    expect(screen.getByText('Forecast for 7 days')).toBeInTheDocument();
  });

  it('should render the first 7 forecast items by default', () => {
    const forecastItems = screen.getAllByText('Mock Icon');

    expect(forecastItems.length).toBe(7);
  });

  it('should render "Today" for the first day', () => {
    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('should render the button with text "More" by default', () => {
    expect(screen.getByText('More')).toBeInTheDocument();
  });

  describe('when `More` button was clicked', () => {
    beforeEach(async () => {
      const button = screen.getByText('More');
      await userEvent.click(button);
    });

    it('should render label `Forecast for 14 days`', async () => {
      expect(screen.getByText('Forecast for 14 days')).toBeInTheDocument();
    });

    it('should render forecast for 14 days', async () => {
      expect(screen.getAllByText('Mock Icon').length).toBe(14);
    });

    it('should render `Less` button', async () => {
      expect(screen.getByText('Less')).toBeInTheDocument();
    });

    describe('when `Less` button was clicked', () => {
      beforeEach(async () => {
        const button = screen.getByText('Less');
        await userEvent.click(button);
      });

      it('should render label `Forecast for 7 days`', async () => {
        expect(screen.getByText('Forecast for 7 days')).toBeInTheDocument();
      });

      it('should render forecast for 7 days', async () => {
        expect(screen.getAllByText('Mock Icon').length).toBe(7);
      });

      it('should render `More` button', async () => {
        expect(screen.getByText('More')).toBeInTheDocument();
      });
    });
  });
});
