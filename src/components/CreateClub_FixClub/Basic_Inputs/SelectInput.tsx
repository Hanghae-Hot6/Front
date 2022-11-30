import React from 'react';
import styled from 'styled-components';
import {SubmitClubType} from '../../../types/clubList';

type SelectInputProps = {
  input: SubmitClubType;
  setInput: React.Dispatch<React.SetStateAction<SubmitClubType>>;
  name: keyof Omit<SubmitClubType, 'thumbnail'>;
  placeholder?: string;
  width?: string;
  flex?: number;
  options: string[];
};

const SelectInput = ({
  input,
  name,
  setInput,
  placeholder,
  width,
  flex,
  options,
}: SelectInputProps) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    e.preventDefault();

    const {name, value} = e.target;

    setInput({...input, [name]: value});
  };

  return (
    <>
      <Select
        name={name}
        onChange={handleChange}
        defaultValue={placeholder}
        required
        width={width}
        value={input[name]}
        flex={flex}>
        <Option value={placeholder} disabled>
          {placeholder}
        </Option>
        {options.map((val, index) => {
          return (
            <Option key={index} value={val}>
              {val}
            </Option>
          );
        })}
      </Select>
    </>
  );
};
export default SelectInput;

const Select = styled.select<{
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
  margin-left: 1rem;
`;

const Option = styled.option`
  border: none;
  height: 5.6rem;
  font-size: 2.2rem;
  color: ${props => props.theme.Black};
`;
