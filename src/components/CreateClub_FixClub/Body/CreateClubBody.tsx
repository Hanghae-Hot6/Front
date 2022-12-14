import axios from 'axios';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useMutation} from 'react-query';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import NavigationButton from '../../../common/NavigationButton';
import ThinLine from '../../../common/ThinLine';
import useWindowSizeDetector from '../../../Hooks/useWindowSizeDetector';
import FixClubPage from '../../../Pages/FixClubPage';
import {
  addBook,
  emptyBooks,
} from '../../../Redux/modules/slices/selectBooksSlice';
import {useAppDispatch, useAppSelector} from '../../../Redux/store/store';
import Theme from '../../../theme/Theme';
import {submitClubKeysInKorean, SubmitClubType} from '../../../types/clubList';
import {getAccessToken} from '../../../utils';

import DateInput from '../Basic_Inputs/DateInput';
import SelectInput from '../Basic_Inputs/SelectInput';
import TextArea from '../Basic_Inputs/TextArea';
import TextInput from '../Basic_Inputs/TextInput';
import BooksViewer from '../BooksViewer/BooksViewer';
import ImageInput from '../ImageInput/ImageInput';
import ParagraphDiv from '../ParagraphDiv/ParagraphDiv';
import SearchBooks from '../SearchBooks/SearchBooks';

type CreateClubBodyProps = {
  fixClubData?: SubmitClubType | undefined;
  clubId?: undefined | number;
};

const initialValue: SubmitClubType = {
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

const CreateClubBody = ({
  fixClubData = undefined,
  clubId = undefined,
}: CreateClubBodyProps) => {
  const [input, setInput] = useState<SubmitClubType>(initialValue);
  const dispatch = useAppDispatch();
  const {windowWidth} = useWindowSizeDetector();
  const getSingleNaverBookData = async (bookIsbn: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/book/search?keyword=${bookIsbn}&start=1&display=16`,
      );
      return response.data.data;
    } catch (err) {
      return undefined;
    }
  };

  const fixClubDataAccepted = useCallback(
    async (fixClubData: SubmitClubType | undefined) => {
      if (fixClubData) {
        setInput(fixClubData);

        let book1;
        let book2;
        let book3;

        // redux??? ??? ?????????(NaverBooksDataType) ????????????
        if (fixClubData.book1 !== '?????? ???????????????') {
          book1 = await getSingleNaverBookData(fixClubData.book1);
          dispatch(addBook(book1[0]));
        }
        if (fixClubData.book2 !== '?????? ???????????????') {
          book2 = await getSingleNaverBookData(fixClubData.book2);
          dispatch(addBook(book2[0]));
        }
        if (fixClubData.book3 !== '?????? ???????????????') {
          book3 = await getSingleNaverBookData(fixClubData.book3);
          dispatch(addBook(book3[0]));
        }
      }
    },
    [],
  );

  useEffect(() => {}, [input]);

  // unmount??? redux??? ?????? ??? ???????????? ?????? ?????????
  useEffect(() => {
    return () => {
      dispatch(emptyBooks());
    };
  }, []);

  useEffect(() => {
    if (!!fixClubData) {
      fixClubDataAccepted(fixClubData);
    }
  }, [fixClubData]);

  const accessToken = getAccessToken();

  const navigate = useNavigate();

  const books = useAppSelector(state => state.selectBooksReducer);

  // ????????????

  const {mutate: clubSubmit} = useMutation(
    async (formData: FormData) => {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/clubs`, formData, {
        headers: {
          Authorization: accessToken,
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    {
      onSuccess: () => {
        window.confirm('?????? ?????? ??????');
        navigate('/');
      },
      onError: err => {
        // ?????? ?????? ????????????
        console.log(err);
        window.confirm('?????? ????????? ?????????????????? ????????? ??????????????????');
      },
    },
  );

  // ????????????

  const {mutate: clubFix} = useMutation(
    async (val: (FormData | number)[]) => {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/clubs/${val[1]}`,
        val[0],
        {
          headers: {
            Authorization: accessToken,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
    },
    {
      onSuccess: () => {
        window.confirm('?????? ?????? ??????');
        navigate('/');
      },
      onError: err => {
        window.confirm('?????? ????????? ?????????????????? ???????????? ?????? ??????????????????');
        // console.log('?????? ?????? ????????? ?????????, ?????? ????????? ??????????????????');
        // console.log(err);
      },
    },
  );

  const handleSubmit = async () => {
    // ??? 14??? ???

    let emptyValueCollection: string[] = [];
    Object.keys(input).forEach((val, index) => {
      if (
        val === 'thumbnail' ||
        val === 'book1' ||
        val === 'book2' ||
        val === 'book3'
      ) {
        // thumbnail ?????? pass???
      } else if (
        input[val as keyof Omit<SubmitClubType, 'thumbnail'>].trim() === ''
      ) {
        emptyValueCollection.push(
          val as keyof Omit<SubmitClubType, 'thumbnail'>,
        );
      }
    });

    if (emptyValueCollection.length !== 0) {
      const emptyValueList = emptyValueCollection.map(val => {
        return submitClubKeysInKorean[
          val as keyof Omit<
            SubmitClubType,
            'thumbnail' | 'book1' | 'book2' | 'book3'
          >
        ];
      });

      window.confirm(`???????????? ??? ?????? ??????????????? ${emptyValueList.join(',')}`);
      return;
    }

    // ????????? ????????? window.confirm ??? ?????????

    //
    const formData = new FormData();
    formData.append('clubName', input.clubName);
    formData.append('category', input.category);
    formData.append('clubIntro', input.clubIntro);

    if (books.book1?.isbn) {
      formData.append('book1', books.book1?.isbn);
      if (books.book2?.isbn) {
        formData.append('book2', books.book2?.isbn);
        if (books.book3?.isbn) {
          formData.append('book3', books.book3?.isbn);
        }
      } else {
        if (books.book3?.isbn) {
          formData.append('book2', books.book3?.isbn);
        }
      }
    } else {
      if (books.book2?.isbn) {
        formData.append('book1', books.book2?.isbn);
      } else {
        if (books.book3?.isbn) {
          formData.append('book1', books.book3?.isbn);
        } else {
          window.confirm('????????? ????????? ??? ??? ????????? ???????????????????????????');
          return;
        }
      }
    }

    if (input.thumbnail !== '') {
      if (typeof input.thumbnail === 'string') {
        formData.append('beforeThumbnail', input.thumbnail);
      } else {
        formData.append('thumbnail', input.thumbnail);
      }
    }
    formData.append('memberMaxNum', input.memberMaxNum);
    formData.append('startDate', input.startDate);
    formData.append('finishDate', input.finishDate);
    formData.append('location', input.location);
    formData.append('schedule', input.schedule);
    formData.append('clubSummary', input.clubSummary);
    formData.append('bookSummary', input.bookSummary);

    // ????????? ??????

    if (!!fixClubData) {
      clubFix([formData, clubId!]);
    } else {
      clubSubmit(formData);
    }

    //
  };
  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <>
      {/* Input part 1 */}
      <form onSubmit={handleOnSubmit}>
        <ParagraphDiv>
          <TextInput
            input={input}
            setInput={setInput}
            name="clubName"
            placeholder="???????????? ??????????????????"
            flex={5}
          />
          <SelectInput
            input={input}
            setInput={setInput}
            name="category"
            placeholder={windowWidth > 576 ? '???????????? ??????' : '????????????'}
            flex={2}
            marginLeft="1rem"
            options={[
              '??????',
              '?????? ??????',
              '????????????',
              '??????',
              '????????????',
              '????????????',
              'IT?????????',
            ]}
          />
        </ParagraphDiv>
        <ParagraphDiv>
          <TextInput
            input={input}
            setInput={setInput}
            name="clubIntro"
            maxCharLength={50}
            placeholder="?????? ????????? ??? ?????? ??????????????????"
          />
        </ParagraphDiv>
        <ParagraphDiv>
          <SearchBooks />
        </ParagraphDiv>

        <ParagraphDiv>
          <ImageInput
            input={input}
            setInput={setInput}
            name="thumbnail"
            thumbnail={
              typeof fixClubData?.thumbnail === 'object'
                ? undefined
                : fixClubData?.thumbnail
            }
          />
        </ParagraphDiv>

        <ThinLine color={Theme.LightGray2} />

        {/* input part 2 */}
        <ParagraphDiv title="??????">
          <SelectInput
            input={input}
            setInput={setInput}
            name="memberMaxNum"
            placeholder="?????? ?????? 10?????????"
            // width="29.2rem"
            flex={1}
            options={['2', '3', '4', '5', '6', '7', '8', '9', '10']}
          />
        </ParagraphDiv>
        <ParagraphDiv title="??????">
          <DateInput
            input={input}
            setInput={setInput}
            name="startDate"
            dateInputType="startDate"
          />
        </ParagraphDiv>
        <ParagraphDiv title="??????">
          <DateInput
            input={input}
            setInput={setInput}
            name="finishDate"
            dateInputType="finishDate"
          />
        </ParagraphDiv>

        <ParagraphDiv title="??????">
          <TextInput
            input={input}
            setInput={setInput}
            name="location"
            placeholder="????????? ????????? ?????????"
          />
        </ParagraphDiv>

        <ParagraphDiv title="??????">
          <TextArea
            input={input}
            setInput={setInput}
            name="schedule"
            placeholder="???) 1/1 ????????? ?????? 10:30 - 02:00"
            // width="55.8rem"
            height="17.8rem"
          />
        </ParagraphDiv>
        <ThinLine color={Theme.LightGray2} />

        <StaticTitle>????????? ?????? ?????? ?????? ?????????. </StaticTitle>

        {/* ?????????  */}

        <ParagraphDiv>
          <TextArea
            input={input}
            setInput={setInput}
            name="clubSummary"
            placeholder="?????? ????????? ?????????????????? "
            height="40.5rem"
          />
        </ParagraphDiv>

        <ThinLine color={Theme.LightGray2} />

        <StaticTitle>???????????? ?????? ????????????. </StaticTitle>

        <BooksViewer />

        <ParagraphDiv>
          <TextArea
            input={input}
            setInput={setInput}
            name="bookSummary"
            placeholder="?????? ?????? ????????? ????????? ????????? ??????????????????"
            height="40.5rem"
          />
        </ParagraphDiv>

        <ParagraphDiv>
          {/* <NavigationSubmitButton onClickCallback={handleSubmit}>
            ????????????
          </NavigationSubmitButton> */}

          <SubmitButton>
            {!!fixClubData ? '?????? ????????????' : '????????????'}
          </SubmitButton>
        </ParagraphDiv>
      </form>
      {/* ??? ????????? */}
    </>
  );
};

export default CreateClubBody;

const StaticTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 800;
  margin: 2.6rem 0;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: ${props => props.theme.MainColor};
  color: ${props => props.theme.White};
  margin: 2rem 0;
  height: 9.2rem;
  font-size: 2.6rem;
`;
