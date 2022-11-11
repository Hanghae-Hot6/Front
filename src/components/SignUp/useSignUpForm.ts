import axios from 'axios';
import {useEffect, useState} from 'react';
import {useMutation} from 'react-query';
import validate from './validate';

type SignUpValuesProps = {
  memberId: string;
  email: string;
  username: string;
  address: string;
  phoneNumber: string;
  password: string;
  passwordCheck: string;
};

type ErrorsValue = {
  memberId?: string;
  email?: string;
  username?: string;
  address?: string;
  phoneNumber?: string;
  password?: string;
  passwordCheck?: string;
};

function useSignUpForm(initialValues: SignUpValuesProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ErrorsValue>({});
  const [submitting, setSubmitting] = useState(false);
  const {mutate: signUpSubmitMutate} = useMutation(
    async (values: SignUpValuesProps) => {
      console.log(values);
      const response = await axios.post('/members/signup', values);
      return response;
    },
    {
      onSuccess: () => {},
      onError: error => {
        console.log(error);
      },
    },
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.currentTarget;
    setValues({...values, [name]: value});
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    event.preventDefault();

    setErrors(validate({...values}));
  };

  useEffect(() => {
    if (submitting) {
      if (Object.keys(errors).length === 0) {
        signUpSubmitMutate(values);
      }

      setSubmitting(false);
    }
  }, [errors]);

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  };
}

export default useSignUpForm;
