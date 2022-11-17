import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import GlobalModal from '../../../common/GlobalModal';
import NavigationButton from '../../../common/NavigationButton';
import {openGlobalModal} from '../../../Redux/modules/slices/modalSlice';
import {useAppDispatch} from '../../../Redux/store/store';
import {getAccessToken} from '../../../utils';
import SearchBooks from '../SearchBooks/SearchBooks';
import * as B from './CreateClubBody.style';
import ImagePreview from './ImagePreview/ImagePreview';
import CreateClubInputDiv from './InputDiv/CreateClubInputDiv';

type CreateClubBodyProps = {};

type InputType = {
  clubName: string;
  clubIntro: string;
  // book: string;
  plan: string;
  // bookPlan: File[];
  location: string;
  schedule: string;
  memberLimit: number;
  category: string;
  summary: string;
  // image: Blob | '';
  imageUrl: any;
};

const CreateClubBody = ({}: CreateClubBodyProps) => {
  const dispatch = useAppDispatch();

  const initialValue: InputType = {
    clubName: '',
    clubIntro: '',
    // book: '',
    plan: '',
    // bookPlan: [],
    location: '',
    schedule: '',
    memberLimit: 0,
    category: '',
    summary: '',
    imageUrl: '',
  };

  const {data, status, isLoading, error} = useQuery('getBooks', async () => {
    const response = await axios.get(
      `http://43.201.69.50:8080/book/search?keyword=자바&start=1&display=3`,
    );
    return response;
  });

  console.log(data?.data.data);
  // console.log(error);

  const [input, setInput] = useState<InputType>(initialValue);

  const [singleImagePreviewUrl, setSingleImagePreviewUrl] =
    useState<string>('');
  const [multipleImagePreviewUrl, setMultipleImagePreviewUrl] = useState<
    string[]
  >([]);

  useEffect(() => {
    console.log(input);
    console.log(multipleImagePreviewUrl);
  }, [input, multipleImagePreviewUrl]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    const {name, value} = e.target;

    setInput({...input, [name]: value});
  };

  const handleTextareaChange: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = e => {
    e.preventDefault();

    const {name, value} = e.target;
    setInput({...input, [name]: value});
  };

  const handleSingleImageChange: React.ChangeEventHandler<
    HTMLInputElement
  > = e => {
    e.preventDefault();
    const {name} = e.target;

    if (e.target.files?.length) {
      if (e.target.files?.length > 0) {
        console.log(e.target.files[0]);
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          setSingleImagePreviewUrl(reader.result as string);
        };

        setInput({...input, [name]: e.target.files[0]});
      }
    }
  };

  const handleSubmit = async () => {
    const accessToken = getAccessToken();
    const formData2 = new FormData();

    formData2.append('clubName', input.clubName);
    formData2.append('clubIntro', input.clubIntro);
    formData2.append('plan', input.plan);
    formData2.append('location', input.location);
    formData2.append('schedule', input.schedule);
    formData2.append('memberLimit', input.memberLimit.toString());
    formData2.append('category', input.category);
    formData2.append('summary', input.summary);
    formData2.append('image', input.imageUrl);
    if (status === 'success') {
      formData2.append('book1', data!.data.data[0]!['isbn']);
      formData2.append('book2', '');
      // formData2.append('book3', '');
    }

    await axios.post(`${process.env.REACT_APP_BASE_URL}/clubs`, formData2, {
      headers: {
        Authorization: accessToken,
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return (
    <>
      <B.Form>
        {/* 모임소개 */}
        <CreateClubInputDiv title="썸네일 이미지">
          <B.InputImageDiv>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleSingleImageChange}
            />
            <ImagePreview url={singleImagePreviewUrl} />
          </B.InputImageDiv>
        </CreateClubInputDiv>
        <CreateClubInputDiv title="모임이름">
          <input type="text" name="clubName" onChange={handleChange} />
        </CreateClubInputDiv>
        <CreateClubInputDiv title="모임소개">
          <textarea name="clubIntro" onChange={handleTextareaChange} />
        </CreateClubInputDiv>
        <CreateClubInputDiv title="메인 책">
          <input type="text" name="book" onChange={handleChange} />
        </CreateClubInputDiv>
        <CreateClubInputDiv title="일정">
          <textarea name="plan" onChange={handleTextareaChange} />
        </CreateClubInputDiv>
        <CreateClubInputDiv title="추가로 읽을 책">
          <SearchBooks />
        </CreateClubInputDiv>
        <CreateClubInputDiv title="모임장소">
          <input type="text" name="location" onChange={handleChange} />
        </CreateClubInputDiv>
        <CreateClubInputDiv title="모임스케줄">
          <textarea name="schedule" onChange={handleTextareaChange} />
        </CreateClubInputDiv>
        <CreateClubInputDiv title="인원제한수">
          <input type="text" name="memberLimit" onChange={handleChange} />
        </CreateClubInputDiv>
        <CreateClubInputDiv title="카테고리">
          <input type="text" name="category" onChange={handleChange} />
        </CreateClubInputDiv>
        <CreateClubInputDiv title="요약">
          <textarea name="summary" onChange={handleTextareaChange} />
        </CreateClubInputDiv>

        {/* <NavigationButton path="/"> 등록하기</NavigationButton> */}
        <NavigationButton onClickCallback={handleSubmit}>
          {' '}
          등록하기
        </NavigationButton>
      </B.Form>
    </>
  );
};
export default CreateClubBody;
