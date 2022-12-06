import React, {useEffect, useState} from 'react';
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
  const [toggleValue, setToggleValue] = useState<boolean>(false);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
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
      <Select
        name={name}
        onChange={handleChange}
        value={input[name]}
        required
        width={width}
        marginLeft={marginLeft}
        flex={flex}
        toggleValue={toggleValue}>
        <PlaceholderOption value="" disabled>
          {placeholder}
        </PlaceholderOption>
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
  toggleValue: boolean;
}>`
  /* 화살표 디자인하기 */
  -webkit-appearance: none; /* for chrome */
  -moz-appearance: none; /*for firefox*/
  appearance: none;
  background: url(${CaretDown}) no-repeat right 1rem center;

  @media screen and (max-width: 576px) {
    background-size: 3rem;
  }

  @media screen and (max-width: 430px) {
    background-size: 2rem;
  }

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

  ${({marginLeft}) => {
    if (marginLeft) {
      return `margin-left: ${marginLeft};`;
    } else {
      return ``;
    }
  }};

  ${props => {
    if (props.toggleValue) {
      return `color: ${props.theme.Black};`;
    } else {
      return `color: ${props.theme.Gray};`;
    }
  }}

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

const PlaceholderOption = styled(Option)`
  color: ${props => props.theme.Gray};
`;
