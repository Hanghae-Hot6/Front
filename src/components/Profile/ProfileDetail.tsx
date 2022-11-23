import styled from 'styled-components';
import {ProfileDataType} from '../../types/regist';
import profileImg from '../../assets/profileImg.svg';
import profileChatingImg from '../../assets/profileChatingImg.svg';
import GlobalModal from '../../common/GlobalModal';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import RegistStInput from '../Elem/RegistStInput';

function ProfileDetail({data}: ProfileDataType) {
  const dispatch = useAppDispatch();
  const isSignUp = true;
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );
  return (
    <>
      <StUserDiv>
        <div>
          <img src={profileImg} alt="" />
        </div>
        <div>
          <p>{data?.username}</p>
          <p>{data?.memberId}</p>
        </div>
        <div>
          <button onClick={() => dispatch(openGlobalModal('changeProfile'))}>
            개인정보 변경
          </button>
        </div>
      </StUserDiv>
      <StChatDiv>
        <div>
          <img src={profileChatingImg} alt="" />
        </div>
        <div>
          <p>모임원들과 함께 소통해요!</p>
        </div>
        <div>
          <button>메세지</button>
        </div>
      </StChatDiv>

      {/* {isGlobalModalOpen && dispatchId === 'changeProfile' && (
        <GlobalModal id="changeProfile" size="xlg">
          <StModalDiv>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
              }}>
              <RegistStInput height="3rem" />
              <RegistStInput height="3rem" />
              <RegistStInput height="3rem" />
              <RegistStInput height="3rem" />
              <button type="submit">확인</button>
            </form>
          </StModalDiv>
        </GlobalModal>
      )} */}
    </>
  );
}

export default ProfileDetail;

const StUserDiv = styled.div`
  height: 58%;
  border: 1px solid ${props => props.theme.MainColor};
  border-radius: 1rem;
  box-shadow: 11px 9px 19px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  div:nth-child(1) {
    display: flex;
    width: 100%;
    height: 50%;
    justify-content: center;
    img {
    }
  }
  div:nth-child(2) {
    display: flex;
    width: 100%;
    height: 20%;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    p:nth-child(1) {
      font-size: 1.8rem;
      font-weight: bold;
    }
    p:nth-child(2) {
      font-size: 1.6rem;
      color: ${props => props.theme.Gray};
    }
  }
  div:nth-child(3) {
    display: flex;
    width: 100%;
    height: 30%;
    justify-content: center;
    align-items: center;
    button {
      width: 100%;
      height: 70%;
      border: 1px solid ${props => props.theme.MainColor};
      border-radius: 0.7rem;
      background-color: #fff;
      color: ${props => props.theme.MainColor};
      font-weight: bold;
      font-size: 1.6rem;
    }
  }
`;

const StChatDiv = styled.div`
  height: 40%;
  border: 1px solid ${props => props.theme.MainColor};
  border-radius: 1rem;
  box-shadow: 11px 9px 19px rgba(0, 0, 0, 0.08);
  padding: 2rem;

  div:nth-child(1) {
    display: flex;
    width: 100%;
    height: 50%;
    justify-content: center;
    img {
    }
  }
  div:nth-child(2) {
    display: flex;
    width: 100%;
    height: 20%;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    p:nth-child(1) {
      font-size: 1.6rem;
      color: ${props => props.theme.Gray};
    }
  }
  div:nth-child(3) {
    display: flex;
    width: 100%;
    height: 30%;
    justify-content: center;
    align-items: center;
    button {
      width: 100%;
      height: 100%;
      border-radius: 0.7rem;
      background-color: ${props => props.theme.MainColor};
      color: #fff;
      font-weight: bold;
      font-size: 1.6rem;
    }
  }
`;
const StModalDiv = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;
