import React, {useEffect, useRef, useState} from 'react';
import Router from './Shared/Router';
import './App.css';
import useWindowSizeDetector from './utils/useWindowSizeDetector';

function App() {
  const {width} = useWindowSizeDetector();

  useEffect(() => {
    console.log(width);
  }, [width]);

  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
