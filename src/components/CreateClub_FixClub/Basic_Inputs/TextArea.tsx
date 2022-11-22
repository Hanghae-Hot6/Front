import React from 'react';
import styled from 'styled-components';
import {InputType} from '../Body/CreateClubBody';

type TextAreaProps = {
  input: InputType;
  setInput: React.Dispatch<React.SetStateAction<InputType>>;
  name: string;
  placeholder?: string;
  width: string;
  height: string;
};

const TextArea = ({
  input,
  name,
  setInput,
  placeholder,
  width,
  height,
}: TextAreaProps) => {
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
    e.preventDefault();
    const {name, value} = e.target;

    setInput({...input, [name]: value});
  };
  return (
    <Div width={width} height={height}>
      <TextAreaText
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </Div>
  );
};
export default TextArea;

const Div = styled.div<{width: string; height: string}>`
  width: ${({width}) => width};
  height: ${({height}) => height};
  border: 1px solid ${props => props.theme.LightGray};
  padding: 1rem 1rem;
`;

const TextAreaText = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  outline: none;
  font-size: 2.2rem;
  color: ${props => props.theme.Gray};
  font-weight: 600;

  &:hover {
    outline: none;
  }
`;
