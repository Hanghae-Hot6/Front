import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {SubmitClubType} from '../../../types/clubList';
import {CreateClubButton} from '../common/CreateClubDesigns';

import ImagePreview from './ImagePreview/ImagePreview';
// import ImagePreview from './ImagePreview/ImagePreview';

type ImageInputProps = {
  input: SubmitClubType;
  setInput: React.Dispatch<React.SetStateAction<SubmitClubType>>;
  name: keyof SubmitClubType;
  width?: string;
  thumbnail?: string;
  flex?: number;
};

const ImageInput = ({
  input,
  name,
  thumbnail,
  setInput,
  width = '100%',
  flex,
}: ImageInputProps) => {
  const [singleImagePreviewUrl, setSingleImagePreviewUrl] = useState<
    string | undefined
  >('');

  // input을 돔으로 접근하기
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSingleImagePreviewUrl(thumbnail);
  }, [thumbnail]);

  const handleSingleImageChange: React.ChangeEventHandler<
    HTMLInputElement
  > = e => {
    e.preventDefault();
    const {name} = e.target;

    if (e.target.files?.length) {
      if (e.target.files?.length > 0) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          setSingleImagePreviewUrl(reader.result as string);
        };

        setInput({...input, [name]: e.target.files[0]});
      }
    }
  };

  // 이미지 인풋, preview 지우기

  const handleImagePreviewDelete = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    setSingleImagePreviewUrl('');
  };

  const handleInputClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    const yes: HTMLElement = e.currentTarget
      .nextElementSibling as HTMLInputElement;
    yes.click();
  };

  return (
    <>
      <ImageInputDiv width={width} flex={flex}>
        <Div>
          <Span>썸네일 이미지를 삽입해주세요(선택)</Span>
          <CreateClubButton onClick={handleInputClick}>
            이미지 삽입
          </CreateClubButton>
          <Input
            ref={inputRef}
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleSingleImageChange}
          />
        </Div>
        {singleImagePreviewUrl && (
          <ThumbnailPreviewDiv>
            <ImagePreview
              input={input}
              setInput={setInput}
              url={singleImagePreviewUrl}
              handleImagePreviewDelete={handleImagePreviewDelete}
            />
          </ThumbnailPreviewDiv>
        )}
      </ImageInputDiv>
    </>
  );
};
export default ImageInput;

const ImageInputDiv = styled.div<{
  width: string | undefined;
  flex: number | undefined;
}>`
  ${({width}) => {
    if (width) {
      return `width:${width};`;
    }
  }}
  ${({flex}) => {
    if (flex) {
      return `flex:${flex};`;
    }
  }}
  
  display: flex;

  flex-direction: column;
`;

const Div = styled.div`
  height: 5.8rem;
  width: 100%;
  border: 1px solid ${props => props.theme.LightGray};
  display: flex;

  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;

const Span = styled.span`
  font-size: 2.2rem;
  color: ${props => props.theme.Gray};
`;

const ThumbnailPreviewDiv = styled.div`
  width: 100%;
  height: 25.2rem;
  border: 1px solid ${props => props.theme.LightGray};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  display: none;
`;
