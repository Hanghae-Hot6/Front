import React, {ReactNode} from 'react';
import styled from 'styled-components';

type RegistErrorProps = {
  children?: ReactNode;
};

function RegistErrorSpan({children, ...props}: RegistErrorProps) {
  return <StErrorSpan>{children}</StErrorSpan>;
}

export default RegistErrorSpan;

const StErrorSpan = styled.span`
  color: #ff0000;
  font-size: 1.4rem;
  margin-top: 0.4rem;
`;
