import axios from 'axios';
import {useEffect, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import {useAppDispatch} from '../../Redux/store/store';
import validate from '../../utils/validate';

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
type SetIdCheck = boolean | undefined;

function useSignUpForm(initialValues: SignUpValuesProps, isSingUp: boolean) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ErrorsValue>({});
  const [submitting, setSubmitting] = useState(false);
  const [isIdCheck, setIsIdCheck] = useState<SetIdCheck>();

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
        dispatch(openGlobalModal('SignUpComplete'));
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
        localStorage.setItem('userId', values.memberId);
        dispatch(openGlobalModal('LoginComplete'));
      },
      onError: error => {
        console.log(error);
      },
    },
  );

  // id 중복검사
  const {
    data: idCheckData,
    isLoading,
    error: idCheckError,
    refetch: idCheckFetch,
  } = useQuery(
    ['IdDoubleCheck', `${values.memberId}`],
    async () => {
      const {data} = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/members/signup/checkid/${values.memberId}`,
      );
      return data;
    },
    // 버튼을 눌렀을 때만 실행할 수 있도록 만들기 위해, 자동 실행 방지 설정
    {
      refetchOnWindowFocus: false,
      enabled: false,
      // 재시도 횟수 1번
      retry: 1,
      onSuccess: idCheckData => {
        // 통신 성공후 idCheck success를 판별 => 유효성검사
        if (idCheckData) {
          if (idCheckData.success === true) {
            setIsIdCheck(true);
            dispatch(openGlobalModal('idDoubleCheck'));
            // alert(idCheckData.data);
            setErrors({...errors, memberId: idCheckData.data});
          } else if (idCheckData.success === false) {
            setIsIdCheck(false);
            // alert(idCheckData.error.message);
            setErrors({...errors, memberId: idCheckData.error.message});
          }
        }
      },
      onError: (error: any) => {
        console.log(error.message);
      },
    },
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.currentTarget;
    setValues({...values, [name]: value});
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    event.preventDefault();
    setErrors(validate({...values}, isSingUp, isIdCheck));
  };

  const IdCheckHandler = () => {
    idCheckFetch();
  };
  useEffect(() => {
    if (submitting) {
      if (isSingUp) {
        if (isIdCheck) {
          delete errors.memberId;
          if (Object.keys(errors).length === 0) {
            signUpSubmitMutate(values);
          }
        } else {
          errors.memberId = '중복확인이 필요합니다.';
        }
      } else {
        if (Object.keys(errors).length === 0) {
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
    IdCheckHandler,
  };
}

export default useSignUpForm;
