import axios from 'axios';
import {useEffect, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {memberApis} from '../../api/axiosconfig';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import {useAppDispatch} from '../../Redux/store/store';
import {CertNumValuesType, SignValueType} from '../../types/regist';
import validate from '../../utils/validate';

type ErrorsValue = {
  memberId?: string;
  email?: string;
  username?: string;
  address?: string;
  phoneNumber?: string;
  password?: string;
  passwordCheck?: string;
  idCheck?: string;
  emailCheck?: string;
};
type IdCheckType = boolean | undefined;
type EmailCheckType = boolean | undefined;
type CertNumType = string | undefined;

function useSignUpForm(initialValues: SignValueType, isSingUp: boolean) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ErrorsValue>({});
  const [submitting, setSubmitting] = useState(false);
  const [isIdCheck, setIsIdCheck] = useState<IdCheckType>(undefined);
  const [isEmailCheck, setIsEmailCheck] = useState<EmailCheckType>(undefined);
  const [certNumber, setCertNumber] = useState<CertNumType>();

  // signUp
  const {mutate: signUpSubmitMutate} = useMutation(
    async (values: SignValueType) => {
      console.log(values);
      const response = await memberApis.signUp(values);
      return response;
    },
    {
      onSuccess: () => {
        dispatch(openGlobalModal('signUpComplete'));
      },
      onError: error => {
        //401 에러 Bad Request
        console.log(error);
      },
    },
  );
  // login
  const {mutate: loginSubmitMutate} = useMutation(
    async (values: SignValueType) => {
      const response = await memberApis.login(values);
      localStorage.setItem(
        'Authorization',
        JSON.stringify(response.headers.authorization),
      );

      return response;
    },
    {
      onSuccess: data => {
        localStorage.setItem('userId', JSON.stringify(values.memberId));
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
    ['IdDoubleCheck', values.memberId],
    async ({queryKey}) => {
      try {
        const {data} = await memberApis.idCheck(queryKey[1]);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    // 버튼을 눌렀을 때만 실행할 수 있도록 만들기 위해, 자동 실행 방지 설정
    {
      refetchOnWindowFocus: false,
      enabled: false,
      // 재시도 횟수 1번
      retry: 1,
      onSuccess: (idCheckData: any) => {
        // 통신 성공후 idCheckData의 success를 판별 => 유효성검사
        if (idCheckData) {
          console.log(idCheckData);
          if (idCheckData.success === true) {
            setIsIdCheck(true);
            delete errors.idCheck;
            dispatch(openGlobalModal('idCheckTrue'));
          } else if (idCheckData.success === false) {
            dispatch(openGlobalModal('idCheckFalse'));
          }
        }
      },
      onError: (error: any) => {
        // console.log(error.message);
        throw error;
      },
    },
  );

  //email 인증 버튼클릭시 email 전송
  const {
    data: emailCheckData,
    error: emailCheckError,
    refetch: emailCheckFetch,
  } = useQuery(
    ['emailCheck', values.email],

    async ({queryKey}) => {
      console.log(queryKey[1]);
      const {data} = await memberApis.sendEmail(queryKey[1]);
      return data;
    },
    // 버튼을 눌렀을 때만 실행할 수 있도록 만들기 위해, 자동 실행 방지 설정
    {
      refetchOnWindowFocus: false,
      enabled: false,
      // 재시도 횟수 1번
      retry: 0,
      onSuccess: (data: any) => {
        if (data) {
          if (data.success) {
            dispatch(openGlobalModal('emailCheck'));
          } else if (!data.success) {
            dispatch(openGlobalModal('alreadyExistEmail'));
          }
        }
      },
      onError: (error: any) => {
        console.log(error.message);
      },
    },
  );

  // 인증번호 전송
  const {
    data: certNumData,
    error: certNumError,
    refetch: certNumFetch,
  } = useQuery(
    ['certNumCheck', certNumber],
    async ({queryKey}) => {
      const {data} = await memberApis.sendCertNum(queryKey[1]);
      return data;
    },
    // 버튼을 눌렀을 때만 실행할 수 있도록 만들기 위해, 자동 실행 방지 설정
    {
      refetchOnWindowFocus: false,
      // certNumber이 있어야 사용가능
      enabled: !!certNumber,
      // 재시도 횟수 1번
      retry: 1,
      onSuccess: data => {
        console.log(data);
        if (data) {
          if (data.success) {
            setIsEmailCheck(true);
            delete errors.emailCheck;
            dispatch(openGlobalModal('certNumMatchAlert'));
          } else {
            setErrors({...errors, emailCheck: data.error});
            dispatch(openGlobalModal('certNumNotMatchAlert'));
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
    const dupValue = value.trim();
    setValues({...values, [name]: dupValue});
    if (name === 'memberId') {
      // vale값이 바뀔때마다 중복검사 여부는 false가 되어야 한다.
      setIsIdCheck(false);
    }
    if (name === 'email') {
      setIsEmailCheck(false);
    }
  };

  // 회원가입 버튼 눌렀을 시
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    event.preventDefault();
    // 유효성 검사
    setErrors(validate({...values}, isSingUp, isIdCheck));
  };

  // id 중복체크 버튼
  const IdCheckHandler = () => {
    if (values.memberId === '') {
      dispatch(openGlobalModal('emptyIdAlert'));
    } else {
      idCheckFetch();
    }
  };
  // 이메일 인증 버튼
  const certEmailHandler = () => {
    if (values.email === '') {
      dispatch(openGlobalModal('emailCertAlert'));
    } else {
      emailCheckFetch();
    }
  };
  // 이메일 인증번호 작성후 모달 확인 버튼
  const emailModalCheckHandler = (certNumObj: any) => {
    let certNum = '';
    for (let b = 0; b < Object.keys(certNumObj).length; b++) {
      certNum = certNum + certNumObj['certNumber' + b];
    }

    setCertNumber(certNum);
    if (certNumber === '' || undefined) {
      dispatch(openGlobalModal('certNumEmptyAlert'));
    } else {
      console.log(certNum);
      certNumFetch();
    }
  };

  useEffect(() => {
    // submit시 submitting이 true로 바뀜
    if (submitting) {
      if (isSingUp) {
        // signUp인 경우
        // 1.중복검사 여부 판별
        if (isIdCheck === true && isEmailCheck === true) {
          // 2.유효성 검사 통과 여부 판별
          if (Object.keys(errors).length === 0) {
            // 통과시 submit
            signUpSubmitMutate(values);
          }
        } else {
          if (isIdCheck === false) {
            // 중복검사 X 시 errors 추가
            errors.idCheck = '중복확인이 필요합니다.';
          }
          if (isEmailCheck === false) {
            // 중복검사 X 시 errors 추가
            errors.emailCheck = '중복확인이 필요합니다.';
          }
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
  }, [errors, submitting, isSingUp]);

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit,
    IdCheckHandler,
    certEmailHandler,
    emailModalCheckHandler,
  };
}

export default useSignUpForm;
