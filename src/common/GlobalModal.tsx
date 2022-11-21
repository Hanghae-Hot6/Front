import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {closeGlobalModal} from '../Redux/modules/slices/modalSlice';
import {useAppDispatch, useAppSelector} from '../Redux/store/store';

type modalProps = {
  id?: string;
  type?: string;
  size?: string;
  confirmPath?: string;
  cancelPath?: string;
  message?: string;
  children?: React.ReactNode;
  onConfirmCallback?: ({...props}) => void;
  onCancelCallback?: ({...props}) => void;
};

function GlobalModal({
  id,
  type,
  confirmPath,
  cancelPath,
  message,
  children,
  onConfirmCallback,
  onCancelCallback,

  ...props
}: modalProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );

  //모달 뒤에 스크롤 막기
  useEffect(() => {
    document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  // 확인 버튼 눌렀을 시
  const onConfirmHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(closeGlobalModal(id));

    if (onConfirmCallback) {
      onConfirmCallback({...props});
    }

    if (confirmPath) {
      navigate(confirmPath);
    }
  };

  // 취소 버튼 눌렀을 시
  const onCancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(closeGlobalModal(id));

    if (onCancelCallback) {
      onCancelCallback({...props});
    }

    if (cancelPath) {
      navigate(cancelPath);
    }
  };

  if (!isGlobalModalOpen) {
    return <></>;
  }

  // alert, confirm, 그냥 내용물을 마음대로 넣을 수 있는 모달 3가지로 구성
  return createPortal(
    <StModal>
      {dispatchId === id && type === 'alertModal' ? (
        <StModalBody {...props}>
          <StContainer {...props}>{children}</StContainer>
          <button onClick={onConfirmHandler}>확인</button>
        </StModalBody>
      ) : dispatchId === id && type === 'confirmModal' ? (
        <StModalBody {...props}>
          <StContainer>{children}</StContainer>
          <button onClick={onConfirmHandler}>확인</button>
          <button onClick={onCancelHandler}>취소</button>
        </StModalBody>
      ) : (
        <StModalBody {...props}>{children}</StModalBody>
      )}
    </StModal>,
    document.getElementById('GlobalModal') as HTMLElement,
  );
}

export default GlobalModal;

const StModal = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StModalBody = styled.div<modalProps>`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 35rem;
  height: ${props => {
    console.log(props.size);
    return props.size === 'lg' ? '35rem' : '25rem';
  }};
  /* height: 24rem; */
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  justify-content: space-between;
  border: 1px solid ${props => props.theme.MainColor};
  button {
    height: 5.5rem;
    background-color: ${props => props.theme.MainColor};
    color: white;
    font-size: 1.8rem;
  }
`;

const StContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 29.5rem;
  font-size: 1.8rem;
  h2 {
    font-size: 2.3rem;
    font-weight: bold;
  }
  div {
    font-size: 1.8rem;
  }
`;
