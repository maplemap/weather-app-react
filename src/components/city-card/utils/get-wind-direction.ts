type TGetWindDirection = (windDegree: number) => string;

export const getWindDirection: TGetWindDirection = (windDegree: number) => {
  const windDirectionIndex = Math.round((windDegree - 11.25) / 22.5);
  const windNames = [
    'North',
    'North Northeast',
    'Northeast',
    'East Northeast',
    'East',
    'East Southeast',
    'Southeast',
    'South Southeast',
    'South',
    'South Southwest',
    'Southwest',
    'West Southwest',
    'West',
    'West Northwest',
    'Northwest',
    'North Northwest',
  ];

  return windNames[windDirectionIndex];
};
