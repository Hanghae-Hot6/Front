import React from 'react';
import styled from 'styled-components';
import {SubmitClubType} from '../../../types/clubList';
import CaretDown from '../../../assets/CaretDown.svg';

type SelectInputProps = {
  input: SubmitClubType;
  setInput: React.Dispatch<React.SetStateAction<SubmitClubType>>;
  name: keyof Omit<SubmitClubType, 'thumbnail'>;
  placeholder?: string;
  width?: string;
  flex?: number;
  options: string[];
  marginLeft?: string;
};

const SelectInput = ({
  input,
  name,
  setInput,
  placeholder,
  width,
  flex,
  options,
  marginLeft,
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
        value={input[name]}
        required
        width={width}
        marginLeft={marginLeft}
        flex={flex}>
        <Option value="" disabled>
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
  marginLeft: string | undefined;
  flex: number | undefined;
}>`
  /* 화살표 디자인하기 */
  -webkit-appearance: none; /* for chrome */
  -moz-appearance: none; /*for firefox*/
  appearance: none;
  background: url(${CaretDown}) no-repeat right 1rem center;

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
  border: 1px solid ${props => props.theme.LightGray};
  padding: 0 1rem;
  font-size: 2.2rem;
  color: ${props => props.theme.Gray};
  ${({marginLeft}) => {
    if (marginLeft) {
      return `margin-left: ${marginLeft};`;
    } else {
      return ``;
    }
  }};

  &:focus {
    outline: none;
  }
`;

const Option = styled.option`
  border: none;
  height: 5.6rem;
  font-size: 2.2rem;
  color: ${props => props.theme.Black};
`;
