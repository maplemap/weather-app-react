export type TIsItCurrentDayByTimestamps = (
  firstTimestamp: number,
  secondTimestamp: number
) => boolean;

export const isItCurrentDayByTimestamps: TIsItCurrentDayByTimestamps = (
  firstTimestamp,
  secondTimestamp
) => {
  const days = [firstTimestamp, secondTimestamp].map((timestamp) =>
    Math.floor(timestamp / (3600 * 24))
  );

  return days[0] === days[1];
};
