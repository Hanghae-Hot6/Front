import React from 'react';
import * as P from './ImagePreview.style';

type ImagePreviewProps = {
  url: string;
};

const ImagePreview = ({url}: ImagePreviewProps) => {
  return (
    <>
      <P.Div>
        <P.Img src={url} alt="" />
      </P.Div>
    </>
  );
};
export default ImagePreview;
