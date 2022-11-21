import React from 'react';
import styled from 'styled-components';

type ThinLineProps = {
  color: string;
};

const ThinLine = ({color}: ThinLineProps) => {
  return <ThinLineDiv color={color} />;
};
export default ThinLine;
const ThinLineDiv = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({color}) => color};
`;
