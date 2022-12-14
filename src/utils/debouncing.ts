export const debouncer = (
  callback: (value: any) => void,
  limit: number,
): any => {
  let timeout: NodeJS.Timeout;

  return (value: any) => {
    if (timeout) {
      console.log(timeout);
      clearTimeout(timeout);
    }
    timeout = setTimeout(async () => {
      console.log(value);
      await callback(value);
    }, limit);
  };
};
