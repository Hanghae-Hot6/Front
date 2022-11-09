import React, {ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';

type CommonButtonProps = {
  path: string;

  callback?: ({...props}) => void;
  children?: ReactNode;
};

const CommonButton = ({
  path,
  callback,

  children,
}: CommonButtonProps) => {
  const navigate = useNavigate();
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    navigate(path);

    if (callback) {
      callback({});
    }
  };

  return (
    <>
      <button onClick={handleClick}>{children}</button>
    </>
  );
};
export default CommonButton;
