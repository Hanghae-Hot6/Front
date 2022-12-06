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
      willUpdate = validator({value});
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return {value, handleChange};
};

export default useInput;
