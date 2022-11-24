import React from 'react';
import styled from 'styled-components';
import {InputType} from '../Body/CreateClubBody';

type DateInputProps = {
  input: InputType;
  setInput: React.Dispatch<React.SetStateAction<InputType>>;
  name: keyof InputType;
  placeholder?: string;
  width?: string;
  flex?: number;
};

const DateInput = ({
  input,
  name,
  setInput,
  placeholder,
  width = '100%',
  flex,
}: DateInputProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    const {name, value} = e.target;

    setInput({...input, [name]: value});
  };

  return (
    <>
      <TextInputInput
        type="date"
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        width={width}
        flex={flex}
      />
    </>
  );
};
export default DateInput;

const TextInputInput = styled.input<{
  width: string | undefined;
  flex: number | undefined;
}>`
  ${({width}) => {
    if (width) {
      return `width:${width};`;
    }
  }}
  ${({flex}) => {
    if (flex) {
      return `flex:${flex};`;
    }
  }}
  height: 5.8rem;
  border: 1px solid ${props => props.theme.LightGray};
  padding: 0 1rem;
  font-size: 2.2rem;
  color: ${props => props.theme.Gray};
  &:focus {
    outline: none;
  }
`;
