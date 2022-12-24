export const debouncer = (
  callback: (value: any) => void,
  limit: number,
): any => {
  let timeout: NodeJS.Timeout;

  return (value: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(async () => {
      await callback(value);
    }, limit);
  };
};
