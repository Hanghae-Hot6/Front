import axios from 'axios';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import NavigationButton from '../../../common/NavigationButton';
import ThinLine from '../../../common/ThinLine';
import {useAppSelector} from '../../../Redux/store/store';
import Theme from '../../../theme/Theme';
import {getAccessToken} from '../../../utils';

import DateInput from '../Basic_Inputs/DateInput';
import SelectInput from '../Basic_Inputs/SelectInput';
import TextArea from '../Basic_Inputs/TextArea';
import TextInput from '../Basic_Inputs/TextInput';
import BooksViewer from '../BooksViewer/BooksViewer';
import ImageInput from '../ImageInput/ImageInput';
import ParagraphDiv from '../ParagraphDiv/ParagraphDiv';
import SearchBooks from '../SearchBooks/SearchBooks';

type CreateClubBodyProps = {};

export type InputType = {
  clubName: string;
  category: string;
  clubIntro: string;
  book1: string;
  book2: string;
  book3: string;
  thumbnail: Blob | string;
  memberMaxNum: string;

  startDate: string;
  finishDate: string;
  location: string;
  schedule: string;

  clubSummary: string;

  bookSummary: string;
};

const CreateClubBody = ({}: CreateClubBodyProps) => {
  const initialValue: InputType = {
    clubName: '',
    category: '',
    clubIntro: '',
    book1: '',
    book2: '',
    book3: '',
    thumbnail: '',
    memberMaxNum: '',
    startDate: '',
    finishDate: '',
    location: '',
    schedule: '',
    clubSummary: '',
    bookSummary: '',
  };
  const [input, setInput] = useState<InputType>(initialValue);

  // const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
  //   e.preventDefault();

  //   const {name, value} = e.target;

  //   setInput({...input, [name]: value});
  // };

  const books = useAppSelector(state => state.selectBookReducer);

  useEffect(() => {
    console.log(input);
  }, [input]);

  const handleSubmit = async () => {
    const accessToken = getAccessToken();
    const formData = new FormData();

    // 총 14개 키

    formData.append('clubName', input.clubName);
    formData.append('category', input.category);
    formData.append('clubIntro', input.clubIntro);
    if (books.book1?.isbn) {
      formData.append('book1', books.book1?.isbn);
    }
    if (books.book2?.isbn) {
      formData.append('book2', books.book2?.isbn);
    }
    if (books.book3?.isbn) {
      formData.append('book3', books.book3?.isbn);
    }

    if (input.thumbnail !== '') {
      formData.append('thumbnail', input.thumbnail);
    }
    formData.append('memberMaxNum', input.memberMaxNum);
    formData.append('startDate', input.startDate);
    formData.append('finishDate', input.finishDate);
    formData.append('location', input.location);
    formData.append('schedule', input.schedule);
    formData.append('clubSummary', input.clubSummary);
    formData.append('bookSummary', input.bookSummary);

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/clubs`,
      formData,
      {
        headers: {
          Authorization: accessToken,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  };

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
          name="clubIntro"
          placeholder="인트로를 작성해주세요"
        />
      </ParagraphDiv>
      <ParagraphDiv>
        <SearchBooks input={input} setInput={setInput} />
      </ParagraphDiv>

      <ParagraphDiv>
        <ImageInput input={input} setInput={setInput} name="thumbnail" />
      </ParagraphDiv>

      <ThinLine color={Theme.LightGray2} />

      {/* input part 2 */}

      <ParagraphDiv title="인원">
        <SelectInput
          input={input}
          setInput={setInput}
          name="memberMaxNum"
          placeholder="최대 인원 10명"
          // width="29.2rem"
          flex={1}
          options={['2', '3', '4', '5', '6', '7', '8', '9', '10']}
        />
      </ParagraphDiv>

      <ParagraphDiv title="시작">
        <DateInput input={input} setInput={setInput} name="startDate" />
      </ParagraphDiv>
      <ParagraphDiv title="종료">
        <DateInput input={input} setInput={setInput} name="finishDate" />
      </ParagraphDiv>
      <ParagraphDiv title="장소">
        <TextInput
          input={input}
          setInput={setInput}
          name="location"
          placeholder="장소를 입력해 주세요"
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

      <StaticTitle>모임에 관한 상세 정보 입니다. </StaticTitle>

      {/* 인트로  */}

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

      <StaticTitle>모임에서 읽을 책입니다. </StaticTitle>

      <BooksViewer />

      <ParagraphDiv>
        <TextArea
          input={input}
          setInput={setInput}
          name="bookSummary"
          placeholder="책에 대한 간단한 소개와 의견을 작성해주세요"
          height="40.5rem"
        />
      </ParagraphDiv>

      <ParagraphDiv>
        <NavigationSubmitButton onClickCallback={handleSubmit}>
          등록하기
        </NavigationSubmitButton>
      </ParagraphDiv>

      {/* 책 인트로 */}
    </>
  );
};
export default CreateClubBody;

const StaticTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 800;
  margin: 2.6rem 0;
`;

const NavigationSubmitButton = styled(NavigationButton)`
  width: 100%;
  background-color: ${props => props.theme.MainColor};
  color: ${props => props.theme.White};
  margin: 2rem 0;
  height: 9.2rem;
`;
