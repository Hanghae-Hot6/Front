type ErrorProps = {
  memberId?: string;
  email?: string;
  username?: string;
  address?: string;
  phoneNumber?: string;
  password?: string;
  passwordCheck?: string;
  isIdCheck?: boolean;
  idCheck?: string;
  emailCheck?: string;
};

export default function validate(
  {
    memberId,
    email,
    username,
    address,
    phoneNumber,
    password,
    passwordCheck,
    idCheck,
    emailCheck,
  }: ErrorProps,
  isSingUp?: boolean,
  isIdCheck?: boolean,
) {
  const errors: ErrorProps = {};
  if (isSingUp) {
    if (!memberId) {
      errors.memberId = '아이디가 입력되지 않았습니다.';
    } else if (memberId.length > 20) {
      errors.memberId = '20자 이상 작성은 불가능 합니다.';
    } else if (memberId.length < 2) {
      errors.memberId = '2자 이상의 이름을 작성해주세요.';
    }

    if (!email) {
      errors.email = '이메일이 입력되지 않았습니다.';
    } else if (email.length >= 30) {
      errors.email = '30자 이상 작성은 불가능 합니다.';
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/i.test(email)
    ) {
      errors.email = '이메일 형식으로 작성해주세요.';
    }

    if (!username) {
      errors.username = '닉네임이 입력되지 않았습니다.';
    } else if (username.length > 20) {
      errors.username = '20자 이상 작성은 불가능 합니다.';
    } else if (username.length < 2) {
      errors.username = '1자 이상의 이름을 작성해주세요.';
    }
    // if (!address) {
    //   errors.address = '주소가 입력되지 않았습니다.';
    // } else if (address.length > 20) {
    //   errors.address = '20자 이상 작성은 불가능 합니다.';
    // } else if (address.length < 2) {
    //   errors.address = '3자 이상의 이름을 작성해주세요.';
    // }

    // if (!phoneNumber) {
    //   errors.phoneNumber = '전화번호가 입력되지 않았습니다.';
    // } else if (!/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(phoneNumber)) {
    //   errors.phoneNumber = '전화번호 형식으로 작성해주세요';
    // }
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
  } else if (!isSingUp) {
    if (!memberId) {
      errors.memberId = '아이디가 입력되지 않았습니다.';
    }
    // else if (memberId.length > 20) {
    //   errors.memberId = '20자 이상 작성은 불가능 합니다.';
    // } else if (memberId.length < 2) {
    //   errors.memberId = '2자 이상의 아이디를 작성해주세요.';
    // }
    if (!password) {
      errors.password = '비밀번호가 입력되지 않았습니다.';
    }
    // else if (password.length < 8) {
    //   errors.password = '8자 이상의 비밀번호를 작성해주세요.';
    // } else if (password.length >= 20) {
    //   errors.password = '20자 이상 작성은 불가능 합니다.';
    // } else if (
    //   !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(
    //     password,
    //   )
    // ) {
    //   errors.password =
    //     '최소 하나 이상의 문자, 하나의 숫자 및 하나의 특수 문자가 필요합니다.';
    // }
  }

  return errors;
}
