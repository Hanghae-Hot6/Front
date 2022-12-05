import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {SubmitClubType} from '../../../types/clubList';

type TextAreaProps = {
  input: SubmitClubType;
  setInput: React.Dispatch<React.SetStateAction<SubmitClubType>>;
  name: keyof Omit<SubmitClubType, 'thumbnail'>;
  placeholder?: string;
  width?: string;
  height: string;
  maxLength?: number;
};

const TextArea = ({
  input,
  name,
  setInput,
  placeholder,
  width = '100%',
  maxLength = 2000,
  height,
}: TextAreaProps) => {
  const [toggleValue, setToggleValue] = useState<boolean>(false);
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
    e.preventDefault();
    const {name, value} = e.target;

    setInput({...input, [name]: value});
  };

  useEffect(() => {
    if (input[name]) {
      setToggleValue(true);
    } else {
      setToggleValue(false);
    }
  }, [input[name]]);

  return (
    <TextAreaText
      name={name}
      required
      onChange={handleChange}
      placeholder={placeholder}
      width={width}
      value={input[name]}
      maxLength={maxLength}
      height={height}
      toggleValue={toggleValue}
    />
  );
};
export default TextArea;

const TextAreaText = styled.textarea<{
  width: string;
  height: string;
  toggleValue: boolean;
}>`
  width: ${({width}) => width};
  height: ${({height}) => height};
  border: 1px solid ${props => props.theme.LightGray};
  resize: none;
  outline: none;
  font-size: 2.2rem;
  padding: 1rem 1rem;

  &::placeholder {
    color: ${props => props.theme.Gray};
  }

  &:hover {
    outline: none;
  }

  ${props => {
    if (props.toggleValue) {
      return `color: ${props.theme.Black};`;
    } else {
      return `color: ${props.theme.LightGray};`;
    }
  }}
`;
