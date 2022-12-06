import React, {ReactNode} from 'react';
import styled from 'styled-components';

type ParagraphDivProps = {
  title?: string;

  children?: ReactNode;
};

const ParagraphDiv = ({title, children}: ParagraphDivProps) => {
  return (
    <>
      <Div>
        {title && <TitleSpan>{title}</TitleSpan>}

        <Div2>{children}</Div2>
      </Div>
    </>
  );
};
export default ParagraphDiv;

const Div = styled.div`
  display: flex;
  width: 100%;
  /* align-items: center; */
  margin: 1rem 0;
`;

const Div2 = styled.div`
  display: flex;
  width: 100%;
  flex: 12;
  @media screen and (max-width: 430px) {
    flex: 8;
  }
`;

const TitleSpan = styled.span`
  flex: 1;
  font-weight: 700;
  font-size: 2.4rem;
  margin: 1rem 1.6rem;
  @media screen and (max-width: 576px) {
    font-size: 2rem;
  }
`;
