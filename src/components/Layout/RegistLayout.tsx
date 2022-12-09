import {ReactNode} from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
};

function RegistLayout(props: Props) {
  return (
    <StLayout>
      <StSection>{props.children}</StSection>
    </StLayout>
  );
}

export default RegistLayout;

const StLayout = styled.div`
  background-color: #fdfcff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StSection = styled.section`
  display: flex;
  width: 128rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
