import React from 'react';
import main1 from '../../assets/main_reco1.svg';
import main2 from '../../assets/main_reco2.svg';
import styled from 'styled-components';
import {useQuery} from 'react-query';
import axios from 'axios';
const PopularClub = () => {
  return (
    <PopWrap>
      <PopDiv>
        <img src={main1} alt="main1" />
        <div>
          <p>
            곤충이 없는 미래에는 인류의 문명도 없다 발아래에서 소멸하는 우주에
            관한 곤충학자의 경고, 그리고 절실한 호소 레이철 카슨의 『침묵의 봄』
            이후 환경 위기는 이제 익숙한 화두가 되었지만, 멸종과 관련된 논의는
            눈에 띄는 동물들 위주로 이루어져왔다. 그러나 야생생물의 멸종은
            우리의 곁에서도 매일 일어나고 있다. 세계 어디에나 존재하는 곤충들이
            우리의 발아래에서, 눈앞에서 조용히 사라지고 있기 때문이다. 『침묵의
            지구』의 저자 데이브 굴슨은 우리에게 외면받은 채 급격하게 사라져가는
            곤충들의 멸종에 주목한다. 우리는 흔히 곤충을 방제 대상으로 생각하며,
            그들을 멀리하고 가치를 인정하지도 않는다. 그러나 곤충은 지구의
            풍요로운 환경 유지에 필수적인 존재이며, 지구라는 “집”을 우리와
            공유한 일원이기도 하다. 그들은 꽃가루받이와 동물 배설물의 분해를
            비롯한 생태계 서비스를 제공하며, 먹이사슬의 가장 아래에서 생물들이
            생존할 수 있도록 돕는다. 이 책은 곤충의 감소 실태와 그 원인을 면밀히
            검토하면서, 그들의 멸종에 인간의 책임이 있음을 지적한다. 또한 농약의
            사용이 곤충과 야생풀에 미치는 영향을 둘러싼 논쟁들을 샅샅이 파헤치며
            오늘날 인류가 지구 생명들과 공존하기 위해서 반드시 해야 하는 일들을
            제시한다. 최신 연구들과 환경론자들의 실천 방안을 아우른 이 책을
            통해서 독자는 우리가 곤충과 공존해야 하는 이유와 그 방법을 알 수
            있을 것이다.
          </p>
        </div>
      </PopDiv>
      <PopDiv>
        <img src={main2} alt="main2" />
        <div>
          <p>
            RABBIT JUMP 더 높은 도약을 준비하는 검은 토끼의 해 세계화의 종말,
            갈등과 분열, 그리고 전쟁. 수십 년간 이어져 온 평화와 공존의 시대는
            막을 내리고 엄청난 위기감 속에서 사람들은 다가올 미래를 두려워한다.
            자산시장 및 증시의 버블붕괴는 마치 2008년 글로벌 경제위기의 데자뷔를
            보는 듯하다. 제2의 외환위기 경고도 들려온다. 매우 부정적인 전망이
            압도하는 2023년을 목전에 두고 있는 지금, 소비 트렌드 전망에서 가장
            중요한 것은 무엇이 반복되고 무엇이 달라질 것인가를 구별하는 작업일
            것이다. 즉, ‘불황기의 소비 패턴’을 과거와 비교해보는 것이고, 또
            하나는 ‘소비의 전형성’이 사라지는 시대의 흐름을 분석하는 것이다.
            이른바 ‘평균 실종’이 가장 첫 번째 키워드인 이유다. 변화의 속도가
            더욱 빨라지는 2023 대한민국. 소비자들은 어떤 선택을 할 것인가?
          </p>
        </div>
      </PopDiv>
    </PopWrap>
  );
};

export default PopularClub;

const PopWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 7rem;
  position: relative;
  img {
    width: 100%;
    cursor: pointer;
  }
  @media screen and (max-width: 576px) {
    gap: 20px;
    flex-direction: column;
  }
`;

const PopDiv = styled.div`
  div {
    opacity: 0;
    border: 1px solid ${props => props.theme.MainColor};
    background-color: #fff;
    box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.08);
    width: 50rem;
    height: 20rem;
    position: absolute;
    top: 50%;
    z-index: 12;
    transition: all 0.5s;
    padding: 2rem;
    overflow: hidden;
    p {
      font-size: 1.6rem;
      line-height: 1.6;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
    }
  }
  :hover {
    div {
      opacity: 1;
    }
  }
`;
