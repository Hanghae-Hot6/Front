import React from 'react';
import styled from 'styled-components';
import {SubmitClubType} from '../../../types/clubList';

type TextInputProps = {
  input: SubmitClubType;
  setInput: React.Dispatch<React.SetStateAction<SubmitClubType>>;
  name: keyof Omit<SubmitClubType, 'thumbnail'>;
  placeholder?: string;
  width?: string;
  flex?: number;
  fixClubData?: SubmitClubType | undefined;
  //
};

const TextInput = ({
  input,
  name,
  setInput,
  placeholder,
  width = '100%',
  flex,
  fixClubData,
}: TextInputProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    const {name, value} = e.target;

    setInput({...input, [name]: value});
  };

  return (
    <>
      <TextInputInput
        type="text"
        required
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        width={width}
        flex={flex}
        value={input[name]}
      />
    </>
  );
};
export default TextInput;

const TextInputInput = styled.input<{
  width: string | undefined;
  flex: number | undefined;
}>`
  border: 1px solid ${props => props.theme.LightGray};

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

  /* border: none; */
  padding: 0 1rem;
  height: 5.6rem;
  font-size: 2.2rem;
  color: ${props => props.theme.Gray};
  &:focus {
    outline: none;
  }
`;
