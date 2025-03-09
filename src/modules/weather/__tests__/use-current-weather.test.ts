import { renderHook, act } from '@testing-library/react';
import { describe, it, vi, beforeEach, afterEach, expect, Mock } from 'vitest';
import { useFetchCurrentWeather } from '@/modules/weather/api/adapters';
import { useAppContext } from '@/services/store/provider';
import { useCurrentWeather } from '../use-current-weather';

vi.mock('@/services/store/provider', () => ({
  useAppContext: vi.fn(),
}));

vi.mock('@/modules/weather/api/adapters', () => ({
  useFetchCurrentWeather: vi.fn(),
}));

const mockGetData = vi.fn().mockResolvedValue(undefined);

describe('useCurrentWeather Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useAppContext as Mock).mockReturnValue({ units: 'metric' });

    (useFetchCurrentWeather as Mock).mockReturnValue({
      data: {
        city: 'London',
        temperature: 12.5,
        humidity: 80,
        pressure: 1012,
        wind: { speed: 5, degree: 180 },
      },
      getData: mockGetData,
      isLoading: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useCurrentWeather('London'));

    expect(result.current.currentWeather).toEqual({
      city: 'London',
      temperature: 12.5,
      humidity: 80,
      pressure: 1012,
      wind: { speed: 5, degree: 180 },
    });

    expect(result.current.lastDataUpdate).toBeInstanceOf(Date);
  });

  it('should call getData on mount', () => {
    renderHook(() => useCurrentWeather('London'));

    expect(mockGetData).toHaveBeenCalledWith();
  });

  it('should call getData on interval updates', () => {
    vi.useFakeTimers();
    renderHook(() => useCurrentWeather('London'));

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

  it('should update lastDataUpdate on interval updates', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useCurrentWeather('London'));

    const initialUpdateTime = result.current.lastDataUpdate;

    act(() => {
      vi.advanceTimersByTime(5 * 60 * 1000);
    });

    expect(result.current.lastDataUpdate).not.toEqual(initialUpdateTime);

    vi.useRealTimers();
  });

  it('should return the latest weather data when data updates', () => {
    (useFetchCurrentWeather as Mock).mockReturnValue({
      data: {
        city: 'Paris',
        temperature: 15.2,
        humidity: 75,
        pressure: 1015,
        wind: { speed: 3, degree: 90 },
      },
      getData: mockGetData,
      isLoading: false,
    });

    const { result, rerender } = renderHook(() => useCurrentWeather('Paris'));

    rerender();

    expect(result.current.currentWeather).toEqual({
      city: 'Paris',
      temperature: 15.2,
      humidity: 75,
      pressure: 1015,
      wind: { speed: 3, degree: 90 },
    });
  });
});
