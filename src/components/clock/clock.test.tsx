import { render, screen, act } from '@testing-library/react';
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { getTime } from '@/utils/get-time';
import { Clock } from './clock';

vi.mock('@/utils/get-time', () => ({
  getTime: vi.fn(),
}));

const mockedGetTime = vi.mocked(getTime);

describe('Clock Component', () => {
  beforeEach(() => {
    mockedGetTime.mockImplementation(() => '12:00:00');
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should render the initial time correctly', () => {
    render(<Clock />);

    expect(screen.getByText('12:00:00')).toBeInTheDocument();
  });

  describe('when time was update to one second', () => {
    it('should render the updated time', async () => {
      vi.useFakeTimers();

      render(<Clock />);

      mockedGetTime.mockImplementation(() => '12:00:01');
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(screen.getByText('12:00:01')).toBeInTheDocument();
    });
  });
});
