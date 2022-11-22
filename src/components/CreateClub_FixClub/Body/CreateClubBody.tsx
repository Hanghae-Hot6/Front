import React, {useEffect, useState} from 'react';
import SelectInput from '../Basic_Inputs/SelectInput';
import TextArea from '../Basic_Inputs/TextArea';
import TextInput from '../Basic_Inputs/TextInput';

type CreateClubBodyProps = {};

export type InputType = {
  clubName: string;
  category: string;
  thumbnail: Blob | string;
  memberMaxNum: string;
  memberMinNum: string;
  startDate: string;
  finishDate: string;
  location: string;
  schedule: string;
  clubIntro: string;
  clubSummary: string;
  book1: string;
  book2: string;
  book3: string;
  bookIntro: string;
  bookSummary: string;
};

const CreateClubBody = ({}: CreateClubBodyProps) => {
  const initialValue = {
    clubName: '',
    category: '',
    thumbnail: '',
    memberMaxNum: '',
    memberMinNum: '',
    startDate: '',
    finishDate: '',
    location: '',
    schedule: '',
    clubIntro: '',
    clubSummary: '',
    book1: '',
    book2: '',
    book3: '',
    bookIntro: '',
    bookSummary: '',
  };
  const [input, setInput] = useState<InputType>(initialValue);

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <>
      <TextInput
        input={input}
        setInput={setInput}
        name="clubName"
        placeholder="제목을 입력해 주세요"
        width="55.8rem"
      />
      <SelectInput
        input={input}
        setInput={setInput}
        name="category"
        placeholder="카테고리 선택"
        width="29.2rem"
        options={[
          '인문',
          '경영 경제',
          '자기계발',
          '예술',
          '자연과학',
          '사회정치',
          'IT모바일',
        ]}
      />

      <TextArea
        input={input}
        setInput={setInput}
        name="clubName"
        placeholder="1/1 첫번째 회의 10:30 - 02:00"
        width="55.8rem"
        height="17.8rem"
      />
    </>
  );
};
export default CreateClubBody;
