import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {closeGlobalModal} from '../Redux/modules/slices/modalSlice';
import {useAppDispatch, useAppSelector} from '../Redux/store/store';

type modalProps = {
  id?: string;
  type?: string;
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
          {children}
          <button onClick={onConfirmHandler}>확인</button>
        </StModalBody>
      ) : dispatchId === id && type === 'confirmModal' ? (
        <StModalBody {...props}>
          {children}
          <button onClick={onConfirmHandler}>확인</button>
          <button onClick={onCancelHandler}>취소</button>
        </StModalBody>
      ) : (
        <StModalBody {...props}>
          {children}
          <button onClick={onConfirmHandler}>확인</button>
        </StModalBody>
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

const StModalBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 30px;
  width: 400px;
  min-height: 200px;
  max-height: 80%;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  padding: 20px;
`;

// const StModalBtn = styled.Button``
// {isAlertModalOpen && (
//   <GlobalModal
//     type="alertModal"
//     message="Success"
//     onConfirmCallback={() => {
//       console.log('hi');
//       setAlertModalOpen(false);
//     }}></GlobalModal>
// )}
