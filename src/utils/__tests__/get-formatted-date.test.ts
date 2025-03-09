import { describe, it, expect } from 'vitest';
import { getFormattedDate } from '../get-formatted-date';

describe('getFormattedDate', () => {
  describe('when no timestamp is provided', () => {
    it('should return the formatted current date', () => {
      const currentDate = new Date();
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ];

      const expectedDate = `${daysOfWeek[currentDate.getDay()]} ${
        months[currentDate.getMonth()]
      } ${currentDate.getDate()}`;

      expect(getFormattedDate()).toBe(expectedDate);
    });
  });

  describe('when a timestamp is provided', () => {
    it('should return the formatted date for the given timestamp', () => {
      const timestamp = 1672531200; // 1st January 2023
      const expectedDate = 'Sun Jan 1';

      expect(getFormattedDate(timestamp)).toBe(expectedDate);
    });
  });
});
