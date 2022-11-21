import React, {useState} from 'react';

type useInputParamType = {
  initialState: string | undefined;
  validator: ({...props}) => boolean;
};

export const useInput = ({initialState, validator}: useInputParamType) => {
  const [value, setValue] = useState(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: {value},
    } = e;

    let willUpdate = true;
    if (typeof validator === 'function') {
      console.log(value);
      willUpdate = validator({value});
      console.log(willUpdate);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return {value, handleChange};
};

export default useInput;
