import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {SubmitClubType} from '../../../types/clubList';

type DateInputProps = {
  input: SubmitClubType;
  setInput: React.Dispatch<React.SetStateAction<SubmitClubType>>;
  name: keyof Omit<SubmitClubType, 'thumbnail'>;
  placeholder?: string;
  width?: string;
  flex?: number;
  dateInputType: 'startDate' | 'finishDate';
};

const DateInput = ({
  input,
  name,
  setInput,
  placeholder,
  width = '100%',
  flex,
  dateInputType,
}: DateInputProps) => {
  const [toggleDateValue, setToggleDateValue] = useState<boolean>(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    const {name, value} = e.target;

    setInput({...input, [name]: value});
  };

  useEffect(() => {
    if (input[name]) {
      setToggleDateValue(true);
    } else {
      setToggleDateValue(false);
    }
  }, [input[name]]);

  return (
    <>
      <TextInputInput
        type="date"
        name={name}
        required
        onChange={handleChange}
        placeholder={placeholder}
        min={input.startDate}
        max={input.finishDate}
        width={width}
        value={input[name]}
        flex={flex}
        toggleDateValue={toggleDateValue}
      />
    </>
  );
};
export default DateInput;

const TextInputInput = styled.input<{
  width: string | undefined;
  flex: number | undefined;
  toggleDateValue: boolean;
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

  ${props => {
    if (props.toggleDateValue) {
      return `color: ${props.theme.Black};`;
    } else {
      return `color: ${props.theme.Gray};`;
    }
  }}

  &:focus {
    outline: none;
  }
`;
