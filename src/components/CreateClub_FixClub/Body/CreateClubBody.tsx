import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import ThinLine from '../../../common/ThinLine';
import Theme from '../../../theme/Theme';
import DateInput from '../Basic_Inputs/DateInput';
import SelectInput from '../Basic_Inputs/SelectInput';
import TextArea from '../Basic_Inputs/TextArea';
import TextInput from '../Basic_Inputs/TextInput';
import BooksViewer from '../BooksViewer/BooksViewer';
import ImageInput from '../ImageInput/ImageInput';
import ParagraphDiv from '../ParagraphDiv/ParagraphDiv';

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
      {/* Input part 1 */}

      <ParagraphDiv>
        <TextInput
          input={input}
          setInput={setInput}
          name="clubName"
          placeholder="제목을 입력해 주세요"
          flex={2}
        />
        <SelectInput
          input={input}
          setInput={setInput}
          name="category"
          placeholder="카테고리 선택"
          width="29.2rem"
          // flex={1}
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
      </ParagraphDiv>

      <ParagraphDiv>
        <TextInput
          input={input}
          setInput={setInput}
          name="book1"
          placeholder="도서명을 입력해주세요"
          // flex={2}
        />
      </ParagraphDiv>

      <ParagraphDiv>
        <ImageInput />
      </ParagraphDiv>

      <ThinLine color={Theme.LightGray2} />

      {/* input part 2 */}

      <ParagraphDiv title="인원">
        {/* <TextInput
          input={input}
          setInput={setInput}
          name='memberMaxNum'
          placeholder="제목을 입력해 주세요"
          flex={2}
        /> */}
        <SelectInput
          input={input}
          setInput={setInput}
          name="category"
          placeholder="최대 인원 8명"
          // width="29.2rem"
          flex={1}
          options={['2', '3', '4', '5', '6', '7', '8']}
        />
      </ParagraphDiv>

      <ParagraphDiv title="시작">
        <DateInput
          input={input}
          setInput={setInput}
          name="startDate"
          placeholder="제목을 입력해 주세요"
        />
      </ParagraphDiv>
      <ParagraphDiv title="종료">
        <DateInput
          input={input}
          setInput={setInput}
          name="finishDate"
          placeholder="제목을 입력해 주세요"
        />
      </ParagraphDiv>
      <ParagraphDiv title="장소">
        <TextInput
          input={input}
          setInput={setInput}
          name="location"
          placeholder="제목을 입력해 주세요"
        />
      </ParagraphDiv>

      <ParagraphDiv title="일정">
        <TextArea
          input={input}
          setInput={setInput}
          name="schedule"
          placeholder="1/1 첫번째 회의 10:30 - 02:00"
          // width="55.8rem"
          height="17.8rem"
        />
      </ParagraphDiv>
      <ThinLine color={Theme.LightGray2} />

      {/* 인트로  */}

      <ParagraphDiv>
        <TextInput
          input={input}
          setInput={setInput}
          name="clubIntro"
          placeholder="인트로를 작성해주세요"
        />
      </ParagraphDiv>
      <ParagraphDiv>
        <TextArea
          input={input}
          setInput={setInput}
          name="clubSummary"
          placeholder="상세 내용을 작성해주세요"
          height="40.5rem"
        />
      </ParagraphDiv>

      <ThinLine color={Theme.LightGray2} />
      <ParagraphDiv>
        <TextInput
          input={input}
          setInput={setInput}
          name="bookIntro"
          placeholder="책 인트로를 작성해주세요"
        />
        <button>도서삭제</button>
      </ParagraphDiv>
      <BooksViewer />
      <ParagraphDiv>
        <TextArea
          input={input}
          setInput={setInput}
          name="clubSummary"
          placeholder="책에 대한 간단한 소개와 의견을 작성해주세요"
          height="40.5rem"
        />
      </ParagraphDiv>

      {/* 책 인트로 */}
    </>
  );
};
export default CreateClubBody;

const Div1 = styled.div``;
const Div2 = styled.div``;
