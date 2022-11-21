import React from 'react';
import styled from 'styled-components';
import {InputType} from '../Body/CreateClubBody';

type SelectInputProps = {
  input: InputType;
  setInput: React.Dispatch<React.SetStateAction<InputType>>;
  name: string;
  placeholder?: string;
  width: string;
  options: string[];
};

const SelectInput = ({
  input,
  name,
  setInput,
  placeholder,
  width,
  options,
}: SelectInputProps) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    e.preventDefault();

    const {name, value} = e.target;

    setInput({...input, [name]: value});

    console.log(e.target.value);
  };

  return (
    <>
      <Select
        name={name}
        onChange={handleChange}
        defaultValue={placeholder}
        width={width}>
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

const Select = styled.select<{width: string}>`
  width: ${({width}) => width};
  height: 5.8rem;
  border: 1px solid ${props => props.theme.LightGray};
  padding: 0 1rem;
  font-size: 2.2rem;
  color: ${props => props.theme.Gray};
`;

const Option = styled.option`
  border: none;
  height: 5.6rem;
  font-size: 2.2rem;
  color: ${props => props.theme.Black};
`;
