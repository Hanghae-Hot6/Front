import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';

type RegistStFormProps = {
  jc?: string;
  title?: string;
  width?: string;
  height?: string;
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

function RegistStForm({
  jc,
  title,
  children,
  onSubmit,
  ...props
}: RegistStFormProps) {
  return (
    <StForm onSubmit={onSubmit} {...props}>
      <StLogoDiv>
        <img src={logo} alt="" />
        <span>{title}</span>
      </StLogoDiv>
      {children}
    </StForm>
  );
}

export default RegistStForm;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: ${(props: {jc: string}) => props.jc || 'space-between'};
  /* justify-content: ${(props: {jc: string}) =>
    props.jc || 'space-between'}; */
  align-items: flex-start;
  /* height: 102rem; */
  height: ${(props: {height: string}) => props.height};
  /* width: 49.6rem; */
  width: ${(props: {width: string}) => props.width};
  margin: 0 auto;
  border: 1px solid #c1a4ff;
  padding: 4.8rem;
  background-color: #fff;
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
