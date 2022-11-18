import React from 'react';
import styled from 'styled-components';

type RegistStInputProps = {
  id?: string;
  label?: string;
  type?: string;
  name?: string;
  value?: string;
  children?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function RegistStInput({
  id,
  label,
  type,
  name,
  onChange,
  value,
  children,
  ...props
}: RegistStInputProps) {
  return (
    <StInputItemsDiv>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
      />
      {children}
    </StInputItemsDiv>
  );
}

export default RegistStInput;

const StInputItemsDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5.7rem;
  margin-top: 4.4rem;
  position: relative;
  border-bottom: 1px solid #e0e0e0;

  label {
    width: 12rem;
    font-size: 1.8rem;
  }
  input {
    display: flex;
    border: 0;
    outline: none;
    background-color: white;
    font-size: 2rem;
  }
`;
