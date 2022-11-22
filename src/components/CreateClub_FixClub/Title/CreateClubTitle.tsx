import React from 'react';
import * as T from './CreateClubTitle.style';

type CreateClubTitleProps = {
  title: string;
};

const CreateClubTitle = ({title}: CreateClubTitleProps) => {
  return (
    <>
      <T.H1>{title}</T.H1>
    </>
  );
};
export default CreateClubTitle;
