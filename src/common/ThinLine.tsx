import React from 'react';
import styled from 'styled-components';

type ThinLineProps = {
  color: string;
  thick?: string;
};

const ThinLine = ({color, thick = '1px'}: ThinLineProps) => {
  return <ThinLineDiv color={color} thick={thick} />;
};
export default ThinLine;
const ThinLineDiv = styled.div<{thick: string}>`
  width: 100%;
  border-bottom: ${({thick}) => thick} solid ${({color}) => color};
  margin: 0.6rem 0;
`;
