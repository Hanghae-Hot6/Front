import axios from 'axios';
import {useEffect, useState} from 'react';
import {useMutation} from 'react-query';
import {useNavigate} from 'react-router-dom';
import validate from './validate';

type SignUpValuesProps = {
  memberId: string;
  email?: string;
  username?: string;
  address?: string;
  phoneNumber?: string;
  password: string;
  passwordCheck?: string;
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

function useSignUpForm(initialValues: SignUpValuesProps, isSingUp: boolean) {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ErrorsValue>({});
  const [submitting, setSubmitting] = useState(false);

  // signUp
  const {mutate: signUpSubmitMutate} = useMutation(
    async (values: SignUpValuesProps) => {
      console.log(values);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/members/signup`,
        values,
      );
      return response;
    },
    {
      onSuccess: () => {
        alert('회원가입이 완료되었습니다!');
        navigate('/login');
      },
      onError: error => {
        console.log(error);
      },
    },
  );
  // login
  const {mutate: loginSubmitMutate} = useMutation(
    async (values: SignUpValuesProps) => {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/members/login`,
        values,
      );
      localStorage.setItem(
        'Authorization',
        JSON.stringify(response.headers.authorization),
      );
      return response;
    },
    {
      onSuccess: () => {
        alert('로그인 되었습니다.');
        navigate('/');
      },
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
    setErrors(validate({...values}, isSingUp));
  };

  useEffect(() => {
    if (submitting) {
      if (Object.keys(errors).length === 0) {
        if (isSingUp) {
          signUpSubmitMutate(values);
        } else {
          loginSubmitMutate(values);
        }
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
