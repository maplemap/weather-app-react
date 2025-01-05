type TGetPressureInMmHg = (pressureInHpa: number) => number;

export const getPressureInMmHg: TGetPressureInMmHg = (pressureInHpa) => {
  return Math.round(pressureInHpa * 0.75006375541921);
};
