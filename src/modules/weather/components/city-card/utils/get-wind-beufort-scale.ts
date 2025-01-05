type TGetWindBeaufortScaleByMeterInSecond = (windSpeed: number) => string;

export const getWindBeaufortScaleByMeterInSecond: TGetWindBeaufortScaleByMeterInSecond =
  (windSpeed) => {
    const beaufortWindScale = [
      'calm',
      'light air',
      'light breeze',
      'gentle breeze',
      'moderate breeze',
      'fresh breeze',
      'strong breeze',
      'high wind, near gale',
      'gale',
      'severe gale',
      'storm',
      'violent storm',
      'hurricane',
    ];
    let windSpeedIndex = 0;
    const windSpeedScale = [
      [0, 0.3],
      [0.4, 1.6],
      [1.7, 3.5],
      [3.6, 5.5],
      [5.6, 8],
      [8.1, 10.8],
      [10.9, 13.9],
      [14, 17.2],
      [17.3, 20.8],
      [20.9, 24.5],
      [24.6, 28.5],
      [28.6, 32.7],
      [32.8, 1000],
    ];

    windSpeedScale.forEach((speedInterval, index) => {
      if (
        windSpeedScale[index][0] <= windSpeed &&
        windSpeed <= windSpeedScale[index][1]
      ) {
        windSpeedIndex = index;
      }
    });

    return beaufortWindScale[windSpeedIndex];
  };
