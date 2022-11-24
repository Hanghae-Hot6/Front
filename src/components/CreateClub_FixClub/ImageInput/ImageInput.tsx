import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {InputType} from '../Body/CreateClubBody';
import ImagePreview from './ImagePreview/ImagePreview';

type ImageInputProps = {
  input: InputType;
  setInput: React.Dispatch<React.SetStateAction<InputType>>;
  name: keyof InputType;
  width?: string;
  flex?: number;
};

const ImageInput = ({
  input,
  name,
  setInput,
  width = '100%',
  flex,
}: ImageInputProps) => {
  const [singleImagePreviewUrl, setSingleImagePreviewUrl] =
    useState<string>('');
  const [showThumbnailPreview, setShowThumbnailPreview] =
    useState<boolean>(false);

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

  useEffect(() => {
    if (singleImagePreviewUrl === '') {
      setShowThumbnailPreview(false);
    } else {
      setShowThumbnailPreview(true);
    }
  }, [singleImagePreviewUrl]);

  return (
    <>
      <ImageInputDiv width={width} flex={flex}>
        <Div>
          <Span>썸네일 이미지를 삽입해주세요(선택)</Span>

          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleSingleImageChange}
          />
        </Div>
        {singleImagePreviewUrl && (
          <ThumbnailPreviewDiv>
            <ImagePreview
              url={singleImagePreviewUrl}
              setSingleImagePreviewUrl={setSingleImagePreviewUrl}
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

  /* flex-direction: column; */
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
