import { describe, it, expect } from 'vitest';
import { isItCurrentDayByTimestamps } from '../is-it-current-day-by-timestamp';

describe('isItCurrentDayByTimestamps', () => {
  describe('when both timestamps belong to the same day', () => {
    it('should return true', () => {
      const firstTimestamp = 1672531200; // 1st January 2023, 00:00:00
      const secondTimestamp = 1672567199; // 1st January 2023, 23:59:59

      const result = isItCurrentDayByTimestamps(
        firstTimestamp,
        secondTimestamp
      );

      expect(result).toBe(true);
    });
  });

  describe('when timestamps belong to different days', () => {
    it('should return false', () => {
      const firstTimestamp = 1672531200; // 1st January 2023, 00:00:00
      const secondTimestamp = 1672617600; // 2nd January 2023, 00:00:00

      const result = isItCurrentDayByTimestamps(
        firstTimestamp,
        secondTimestamp
      );

      expect(result).toBe(false);
    });
  });
});
