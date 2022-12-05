import React, {useEffect, useState} from 'react';

type WindowSizeType = {
  width: number;
  height: number;
};

const useWindowSizeDetector = () => {
  const [windowSize, setWindowSize] = useState<WindowSizeType>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({width: window.innerWidth, height: window.innerHeight});
    // console.log(window.innerWidth);
    // console.log(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {width: windowSize.width, height: windowSize.height};
};
export default useWindowSizeDetector;
