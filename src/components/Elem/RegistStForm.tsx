import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import {RegistStFormProps} from '../../types/regist';

function RegistStForm({
  jc,
  width,
  height,
  title,
  children,
  onSubmit,
  ...props
}: RegistStFormProps) {
  return (
    <StForm
      onSubmit={onSubmit}
      jc={jc}
      width={width}
      height={height}
      {...props}>
      <StLogoDiv>
        <Link to={'/'}>
          <img src={logo} alt="logo" />
        </Link>
        <span>{title}</span>
      </StLogoDiv>
      {children}
    </StForm>
  );
}

export default RegistStForm;

const StForm = styled.form<{
  jc: string | undefined;
  height: string | undefined;
  width: string | undefined;
}>`
  display: flex;
  flex-direction: column;
  justify-content: ${({jc}) => jc || 'space-between'};
  align-items: flex-start;
  height: ${({height}) => height || '102rem'};
  width: ${({width}) => width || '49.6rem'};
  margin: 0 auto;
  border: 1px solid #c1a4ff;
  padding: 4.8rem;
  background-color: #fff;

  @media screen and (max-width: 576px) {
    height: 100%;
    width: 80vw;
    border: 0;
    padding: 1rem;
    margin: 0 auto;
  }
`;
const StLogoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20.1rem;
  height: 7.7rem;
  margin: 0 auto;
  margin-top: 2.8rem;

  img {
    transform: scale(1);
    margin-bottom: 1.7rem;
  }
  span {
    font-size: 2.8rem;
    font-weight: 700;
  }
`;
