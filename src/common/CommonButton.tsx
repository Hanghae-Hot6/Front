import React from 'react';
import {useNavigate} from 'react-router-dom';

type CommonButtonProps = {
  path: string;
  buttonText: string;
};

const CommonButton = ({path, buttonText}: CommonButtonProps) => {
  const navigate = useNavigate();
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    navigate(path);
  };

  return (
    <>
      <button onClick={handleClick}>{buttonText}</button>
    </>
  );
};
export default CommonButton;
