import React, {useEffect, useState} from 'react';

type WindowSizeType = {
  width: number;
  height: number;
};

const useWindowSizeDetector = () => {
  const [windowSize, setWindowSize] = useState<WindowSizeType>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({width: window.innerWidth, height: window.innerHeight});
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {windowWidth: windowSize.width, windowHeight: windowSize.height};
};
export default useWindowSizeDetector;
