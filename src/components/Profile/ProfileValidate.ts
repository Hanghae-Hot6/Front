import {ErrorsValue} from '../../types/regist';

export const profileValidate = ({
  password,
  passwordCheck,
  address,
  phoneNumber,
}: ErrorsValue) => {
  let errors: ErrorsValue = {};
  if (!password) {
    errors.password = '비밀번호가 입력되지 않았습니다.';
  } else if (password.length < 8) {
    errors.password = '8자 이상의 비밀번호를 작성해주세요.';
  } else if (password.length >= 20) {
    errors.password = '20자 이상 작성은 불가능 합니다.';
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(
      password,
    )
  ) {
    errors.password =
      '최소 하나 이상의 문자, 하나의 숫자 및 하나의 특수 문자가 필요합니다.';
  }
  if (!passwordCheck) {
    errors.passwordCheck = '비밀번호 확인이 입력되지 않았습니다.';
  } else if (passwordCheck !== password) {
    errors.passwordCheck = '비밀번호와 일치하지 않습니다.';
  }
  if (!address) {
    errors.address = '주소가 입력되지 않았습니다.';
  } else if (address.length > 50) {
    errors.address = '50자 이상 작성은 불가능 합니다.';
  } else if (address.length < 2) {
    errors.address = '3자 이상의 이름을 작성해주세요.';
  }

  if (!phoneNumber) {
    errors.phoneNumber = '전화번호가 입력되지 않았습니다.';
  } else if (!/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(phoneNumber)) {
    errors.phoneNumber = '전화번호 형식으로 작성해주세요';
  }
  return errors;
};
