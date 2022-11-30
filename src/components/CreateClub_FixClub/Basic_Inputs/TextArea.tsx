import React from 'react';
import styled from 'styled-components';
import {InputType} from '../Body/CreateClubBody';

type TextAreaProps = {
  input: InputType;
  setInput: React.Dispatch<React.SetStateAction<InputType>>;
  name: keyof InputType;
  placeholder?: string;
  width?: string;
  height: string;
};

const TextArea = ({
  input,
  name,
  setInput,
  placeholder,
  width = '100%',
  height,
}: TextAreaProps) => {
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
    e.preventDefault();
    const {name, value} = e.target;

    setInput({...input, [name]: value});
  };
  return (
    <TextAreaText
      name={name}
      required
      onChange={handleChange}
      placeholder={placeholder}
      width={width}
      height={height}
    />
  );
};
export default TextArea;

const TextAreaText = styled.textarea<{width: string; height: string}>`
  width: ${({width}) => width};
  height: ${({height}) => height};
  border: 1px solid ${props => props.theme.LightGray};
  resize: none;
  outline: none;
  font-size: 2.2rem;
  padding: 1rem 1rem;
  color: ${props => props.theme.Gray};
  font-weight: 600;

  &:hover {
    outline: none;
  }
`;
