export type SignValueType = {
  memberId?: string | undefined;
  email?: string;
  username?: string;
  address?: string;
  phoneNumber?: string;
  password?: string;
  passwordCheck?: string;
};

export type ErrorsValue = {
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

export type IdCheckType = boolean | undefined;
export type EmailCheckType = boolean | undefined;
export type CertNumType = string | undefined;

export type RegistStFormProps = {
  jc?: string | undefined;
  title?: string;
  width?: string;
  height?: string;
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type RegistStInputProps = {
  id?: string;
  label?: string;
  type?: string;
  name?: string;
  value?: string;
  width?: string;
  height?: string;
  maxLength?: number;
  placeholder?: string;
  children?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export type FindPasswordValueType = {
  id: string;
  email: string;
};

export type FindIdValue = {
  email: string;
  username: string;
};

export type CertNumValuesType = {
  certNumber0: string;
  certNumber1: string;
  certNumber2: string;
  certNumber3: string;
  certNumber4: string;
  certNumber5: string;
  certNumber6: string;
  certNumber7: string;
};

export type ProfileDataType = {
  data: {
    memberId?: string;
    email?: string;
    username?: string;
    address?: string;
    phoneNumber?: string;
    clubList?: clubList[];
  };
};

export type clubList = {
  clubId?: number;
  clubName?: string;
  startDate?: string;
  finishDate?: string;
};
