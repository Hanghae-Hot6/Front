import React from 'react';
import * as Sample from './Sample.style';

type sampleProps = {
  name: String;
};

const sample = ({}: sampleProps) => {
  return (
    <>
      <Sample.Section></Sample.Section>
    </>
  );
};
export default sample;
