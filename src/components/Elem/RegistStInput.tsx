import React from 'react';
import styled from 'styled-components';

type RegistStInputProps = {
  id?: string;
  label?: string;
  type?: string;
  name?: string;
  value?: string;
  maxLength?: number;
  placeholder?: string;
  children?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function RegistStInput({
  id,
  label,
  type,
  name,
  value,
  maxLength,
  onChange,
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
        maxLength={maxLength}
        {...props}
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
    display: flex;
    width: 9.9rem;
    font-size: 1.8rem;
    white-space: nowrap;
  }
  input {
    min-width: 50%;
    max-width: 100%;
    display: flex;
    border: 0;
    outline: none;
    background-color: white;
    font-size: 1.8rem;
  }
  img {
    display: flex;
    position: absolute;
    right: 0;
    text-align: center;
  }
`;
