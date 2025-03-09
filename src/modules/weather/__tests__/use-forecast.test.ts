import { renderHook, act } from '@testing-library/react';
import { describe, it, vi, beforeEach, afterEach, expect, Mock } from 'vitest';
import { useFetchForecast } from '@/modules/weather/api/adapters';
import { useAppContext } from '@/services/store/provider';
import { useForecast } from '../use-forecast';

vi.mock('@/services/store/provider', () => ({
  useAppContext: vi.fn(),
}));

vi.mock('@/modules/weather/api/adapters', () => ({
  useFetchForecast: vi.fn(),
}));

const mockGetData = vi.fn().mockResolvedValue(undefined);

describe('useForecast Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useAppContext as Mock).mockReturnValue({ units: 'metric' });

    (useFetchForecast as Mock).mockReturnValue({
      data: [
        {
          date: 1736237066000,
          iconCode: 803,
          dayTemperature: 12.5,
          nightTemperature: 5.2,
          description: 'broken clouds',
        },
      ],
      getData: mockGetData,
      isLoading: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useForecast('London'));

    expect(result.current.forecast).toEqual([
      {
        date: 1736237066000,
        iconCode: 803,
        dayTemperature: 12.5,
        nightTemperature: 5.2,
        description: 'broken clouds',
      },
    ]);

    expect(result.current.isLoading).toBe(false);
  });

  it('should call getData on mount', () => {
    renderHook(() => useForecast('London'));

    expect(mockGetData).toHaveBeenCalledWith();
  });

  it('should call getData on interval updates', () => {
    vi.useFakeTimers();
    renderHook(() => useForecast('London'));

    act(() => {
      vi.advanceTimersByTime(5 * 60 * 1000);
    });

    expect(mockGetData).toHaveBeenCalledWith();

    act(() => {
      vi.advanceTimersByTime(5 * 60 * 1000);
    });

    expect(mockGetData).toHaveBeenCalledWith();

    vi.useRealTimers();
  });

  it('should return the latest forecast data when data updates', () => {
    (useFetchForecast as Mock).mockReturnValue({
      data: [
        {
          date: 1736266126000,
          iconCode: 500,
          dayTemperature: 10,
          nightTemperature: 3,
          description: 'light rain',
        },
      ],
      getData: mockGetData,
      isLoading: false,
    });

    const { result, rerender } = renderHook(() => useForecast('Paris'));

    rerender();

    expect(result.current.forecast).toEqual([
      {
        date: 1736266126000,
        iconCode: 500,
        dayTemperature: 10,
        nightTemperature: 3,
        description: 'light rain',
      },
    ]);
  });

  it('should update isLoading state correctly', () => {
    (useFetchForecast as Mock).mockReturnValue({
      data: [],
      getData: mockGetData,
      isLoading: true,
    });

    const { result } = renderHook(() => useForecast('New York'));

    expect(result.current.isLoading).toBe(true);
  });
});
