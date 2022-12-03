import React, {useEffect, useState} from 'react';
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
  maxLength?: number;
  //
};

const TextInput = ({
  input,
  name,
  setInput,
  placeholder,
  width = '100%',
  flex,
  maxLength = 36,
  fixClubData,
}: TextInputProps) => {
  const [toggleValue, setToggleValue] = useState<boolean>(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
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
    <>
      <TextInputInput
        type="text"
        required
        maxLength={maxLength}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        width={width}
        flex={flex}
        value={input[name]}
        toggleValue={toggleValue}
      />
    </>
  );
};
export default TextInput;

const TextInputInput = styled.input<{
  width: string | undefined;
  flex: number | undefined;
  toggleValue: boolean;
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

  &::placeholder {
    color: ${props => props.theme.Gray};
  }
  /* color: ${props => props.theme.Black}; */

  /* border: none; */
  padding: 0 1rem;
  height: 5.6rem;
  font-size: 2.2rem;

  /* ${props => {
    if (props.toggleValue) {
      return `color: ${props.theme.Black};`;
    } else {
      return `color: ${props.theme.LightGray};`;
    }
  }} */

  &:focus {
    outline: none;
  }
`;
