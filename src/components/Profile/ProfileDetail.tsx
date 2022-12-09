// Libraries(react관련 패키지, 그외 라이브러리)
import {useAppDispatch} from '../../Redux/store/store';

// 그외 (img, css, fn, params...)
import {ProfileDataType} from '../../types/regist';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import profileImg from '../../assets/profileImg.svg';
import profileChatingImg from '../../assets/profileChatingImg.svg';

import * as P from './Profile.style';
function ProfileDetail({data}: ProfileDataType) {
  const dispatch = useAppDispatch();

  return (
    <>
      <P.StUserDiv>
        <div>
          <img src={profileImg} alt="" />
        </div>
        <div>
          <p>{data?.username}</p>
          <p>{data?.memberId}</p>
          <div className="mobile-profile-change">
            <button onClick={() => dispatch(openGlobalModal('profileChange'))}>
              개인정보 변경
            </button>
          </div>
        </div>
        <div className="web-profile-change">
          <button onClick={() => dispatch(openGlobalModal('profileChange'))}>
            개인정보 변경
          </button>
        </div>
      </P.StUserDiv>
      <P.StInquiryMobileDiv>
        <button onClick={() => dispatch(openGlobalModal('inquiryMail'))}>
          문의하기
        </button>
      </P.StInquiryMobileDiv>
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
