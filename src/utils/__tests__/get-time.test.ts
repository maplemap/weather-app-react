import { describe, it, expect, vi } from 'vitest';
import { getTime } from '../get-time';

describe('getTime', () => {
  describe('when no timestamp is provided', () => {
    it('should return the current time in HH:mm format', () => {
      const mockDate = new Date('2023-01-01T10:30:00');
      vi.setSystemTime(mockDate);

      const expectedTime = '10:30';

      expect(getTime()).toBe(expectedTime);

      vi.useRealTimers(); // Відновлюємо реальний час після тесту
    });
  });

  describe('when a timestamp is provided', () => {
    it('should return the time in HH:mm format for the given timestamp', () => {
      const timestamp = new Date('2023-01-01T15:45:00').getTime();
      const expectedTime = '15:45';

      expect(getTime(timestamp)).toBe(expectedTime);
    });
  });
});
