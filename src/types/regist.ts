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
