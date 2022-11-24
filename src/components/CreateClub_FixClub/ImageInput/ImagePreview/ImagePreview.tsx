import React, {useState} from 'react';
import styled from 'styled-components';
import DeleteBtn from '../../../../common/DeleteBtn';
import * as P from './ImagePreview.style';

type ImagePreviewProps = {
  url: string;
  setSingleImagePreviewUrl: React.Dispatch<React.SetStateAction<string>>;
};

const ImagePreview = ({url, setSingleImagePreviewUrl}: ImagePreviewProps) => {
  const [onHover, setOnHover] = useState<boolean>(false);

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    // console.log('del button');
    setSingleImagePreviewUrl('');
  };

  return (
    <>
      <P.Div
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}>
        {onHover && (
          <ButtonDiv>
            <DeleteBtn handleDelete={handleDelete} />
          </ButtonDiv>
        )}

        <P.Img src={url} alt="" />
      </P.Div>
    </>
  );
};
export default ImagePreview;

const ButtonDiv = styled.div`
  position: absolute;
  right: 0.2rem;
  top: 0.3rem;
`;
