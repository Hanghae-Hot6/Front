import React from 'react';
import * as Sample from './Sample.style';

type sampleProps = {
  name: String;
};

const sample = ({}: sampleProps) => {
  return (
    <>
      <Sample.Section>
        <Sample.H1 fontSize={2} fontWeight={600}>
          하이루~~~
        </Sample.H1>
      </Sample.Section>
    </>
  );
};
export default sample;
