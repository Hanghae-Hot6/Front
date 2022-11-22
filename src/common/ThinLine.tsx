import React from 'react';
import styled from 'styled-components';

type ThinLineProps = {
  color: string;
  margin?: string;
};

const ThinLine = ({color, margin = '3rem'}: ThinLineProps) => {
  return <ThinLineDiv color={color} margin={margin} />;
};
export default ThinLine;
const ThinLineDiv = styled.div<{margin: string}>`
  width: 100%;
  border-bottom: 1px solid ${({color}) => color};
  margin: ${({margin}) => margin} 0;
`;
