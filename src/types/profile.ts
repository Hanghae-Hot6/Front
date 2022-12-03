import {Dispatch, SetStateAction} from 'react';

export type CheckPasswordModalProps = {
  setIsPWCorrect: Dispatch<SetStateAction<boolean>>;
  isPWCorrect: boolean;
};
