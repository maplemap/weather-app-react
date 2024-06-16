export type TGenerateId = () => string;

export const generateId: TGenerateId = () => `id${new Date().getTime()}`;
