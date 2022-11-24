import React from 'react';
import styled from 'styled-components';
import {InputType} from '../Body/CreateClubBody';

type TextInputProps = {
  input: InputType;
  setInput: React.Dispatch<React.SetStateAction<InputType>>;
  name: string;
  placeholder?: string;
  width?: string;
  flex?: number;
};

const TextInput = ({
  input,
  name,
  setInput,
  placeholder,
  width = '100%',
  flex,
}: TextInputProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    const {name, value} = e.target;

    setInput({...input, [name]: value});
  };

  return (
    <>
      <TextInputDiv width={width} flex={flex}>
        <TextInputInput
          type="text"
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </TextInputDiv>
    </>
  );
};
export default TextInput;

const TextInputDiv = styled.div<{
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
  margin-right: 1rem;
`;

const TextInputInput = styled.input`
  border: none;
  height: 5.6rem;
  font-size: 2.2rem;
  color: ${props => props.theme.Gray};
  &:focus {
    outline: none;
  }
`;
