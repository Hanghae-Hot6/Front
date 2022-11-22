export type SignValueType = {
  memberId?: string | undefined;
  email?: string;
  username?: string;
  address?: string;
  phoneNumber?: string;
  password?: string;
  passwordCheck?: string;
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
