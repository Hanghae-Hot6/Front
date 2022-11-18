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
  idCheck?: string;
};
type SetIdCheck = boolean | undefined;

function useSignUpForm(initialValues: SignUpValuesProps, isSingUp: boolean) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ErrorsValue>({});
  const [submitting, setSubmitting] = useState(false);
  const [isIdCheck, setIsIdCheck] = useState<SetIdCheck>(undefined);

  // signUp
  const {mutate: signUpSubmitMutate} = useMutation(
    async (values: SignUpValuesProps) => {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/members/signup`,
        values,
      );
      return response;
    },
    {
      onSuccess: () => {
        dispatch(openGlobalModal('signUpComplete'));
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
        dispatch(openGlobalModal('loginComplete'));
      },
      onError: (error: any) => {
        if (error.response.status === 401) {
          dispatch(openGlobalModal('logIn-401Error'));
        }
        console.log('error response', error.response);
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
        // 통신 성공후 idCheckData의 success를 판별 => 유효성검사
        if (idCheckData) {
          if (idCheckData.success === true) {
            setIsIdCheck(true);
            delete errors.idCheck;
            dispatch(openGlobalModal('idDoubleCheck'));
          } else if (idCheckData.success === false) {
            setIsIdCheck(false);
            setErrors({...errors, idCheck: idCheckData.error.message});
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
    // vale값이 바뀔때마다 중복검사 여부는 false가 되어야 한다.
    setIsIdCheck(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    event.preventDefault();
    // 유효성 검사
    setErrors(validate({...values}, isSingUp, isIdCheck));
  };

  // id 중복체크 버튼
  const IdCheckHandler = () => {
    idCheckFetch();
  };

  useEffect(() => {
    // submit시 submitting이 true로 바뀜
    if (submitting) {
      if (isSingUp) {
        // signUp인 경우
        // 1.중복검사 여부 판별
        if (isIdCheck === true) {
          // 2.유효성 검사 통과 여부 판별
          if (Object.keys(errors).length === 0) {
            // 통과시 submit
            signUpSubmitMutate(values);
          }
        } else {
          // 중복검사 X 시 errors 추가
          errors.idCheck = '중복확인이 필요합니다.';
        }
      } else {
        // login인 경우
        // 1. 유효성 검사 통과 여부만 판별
        if (Object.keys(errors).length === 0) {
          loginSubmitMutate(values);
        }
      }

      setSubmitting(false);
    }
  }, [errors, isIdCheck]);

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
