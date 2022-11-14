import React, {ReactNode} from 'react';
import * as I from './CreateClubInputDiv.style';

type CreateClubInputDivProps = {
  title: string;
  children: ReactNode;
};

const CreateClubInputDiv = ({title, children}: CreateClubInputDivProps) => {
  return (
    <>
      <I.Div>
        <I.TitleSpan>{title}</I.TitleSpan>

        {children}
      </I.Div>
    </>
  );
};
export default CreateClubInputDiv;
