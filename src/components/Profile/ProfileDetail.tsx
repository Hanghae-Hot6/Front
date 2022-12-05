import {ProfileDataType} from '../../types/regist';
import profileImg from '../../assets/profileImg.svg';
import profileChatingImg from '../../assets/profileChatingImg.svg';
import GlobalModal from '../../common/GlobalModal';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import * as P from './Profile.style';
function ProfileDetail({data}: ProfileDataType) {
  const dispatch = useAppDispatch();
  const isSignUp = true;
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );

  return (
    <>
      <P.StUserDiv>
        <div>
          <img src={profileImg} alt="" />
        </div>
        <div>
          <p>{data?.username}</p>
          <p>{data?.memberId}</p>
        </div>
        <div>
          <button onClick={() => dispatch(openGlobalModal('profileChange'))}>
            개인정보 변경
          </button>
        </div>
      </P.StUserDiv>
      <P.StChatDiv>
        <div>
          <img src={profileChatingImg} alt="" />
        </div>
        <div>
          <p>불편사항이나 문의사항을 알려주세요.</p>
        </div>
        <div>
          <button onClick={() => dispatch(openGlobalModal('inquiryMail'))}>
            문의하기
          </button>
        </div>
      </P.StChatDiv>
    </>
  );
}

export default ProfileDetail;
