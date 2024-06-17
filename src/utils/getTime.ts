export type TGetTime = (timestamp?: number) => string;

export const getTime: TGetTime = (timestamp) => {
  const now = new Date(timestamp || Date.now());
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
