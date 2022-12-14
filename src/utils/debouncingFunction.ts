export const applyDebouncing = (millisecond: number, callback: () => any) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(callback());
    }, millisecond);
  });
};
