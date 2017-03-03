/* eslint-disable no-console */
export const log = (...args) => {
  if (process.env.NODE_ENV === 'production') return;
  console.log(...args);
};

export const logError = (...args) => {
  if (process.env.NODE_ENV === 'production') return;
  console.error(...args);
};
