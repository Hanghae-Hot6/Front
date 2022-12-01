import styled from 'styled-components';
import quota_circle from '../../../assets/quota_circle.svg';

export const TabList = styled.div`
  section {
    width: 1280px;
    background-color: ${props => props.theme.LightPurple};
    height: 7rem;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    article {
      display: flex;
      justify-content: space-around;

      ul {
        display: flex;
        justify-content: space-around;
        width: 1280px;
        margin-top: 1.5rem;
        cursor: pointer;
        .on {
          background: #ffffff;
          border-radius: 4rem;
          color: ${props => props.theme.LightPurple};
        }
        li {
          font-weight: 700;
          font-size: 2rem;
          padding: 1.5rem;
          width: 12rem;
          height: 4rem;
          color: #b39fde;
          text-align: center;
          line-height: 1rem;
          transition: all 0.5s;
        }
      }
    }
  }
`;

export const ContentWrap = styled.div`
  width: 1280px;
  margin: 5rem auto;
  overflow: hidden;
`;

export const CategoryTitle = styled.h2<{color: string}>`
  font-size: 2.8rem;
  font-weight: 600;
  margin-top: 2.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  > span {
    color: ${props => props.theme.MainColor};
  }
  > p {
    font-weight: 400;
    margin-top: 1.2rem;
    font-size: 1.8rem;
  }
`;

export const CategoryTop = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const ImgWrap = styled.div`
  width: 41.5rem;
  height: 32.6rem;
  background-color: #eee;
  margin-top: 5.5rem;
  position: relative;
  > span {
    color: #fff;
    font-size: 2rem;
    line-height: 5rem;
    padding-left: 1.5rem;
    width: 5.5rem;
    height: 5.5rem;
    position: absolute;
    left: 0;
    top: 0;
    background: url(${quota_circle}) no-repeat 0px 0px;
  }
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
`;

export const PopContentBox = styled.div`
  width: 42rem;
  height: 55rem;
  overflow: hidden;
`;
export const MainImgWrap = styled.div`
  width: 31.4rem;
  height: 31.4rem;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
`;
export const MainContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
export const MainContentBox = styled.div`
  width: 31.6rem;
  height: 49.3rem;
  border: 1px solid #cacad7;
  margin-top: 6.5rem;
  box-sizing: border-box;
`;
export const Summary = styled.p`
  margin-top: 1rem;
  font-size: 1.4rem;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;

export const NullClubWrap = styled.div`
  font-size: 2rem;
  margin-top: 1rem;
`;

export const MainContentWrap = styled.div`
  margin-top: 13rem;
`;

export const MainTitleWrap = styled.div`
  padding-left: 2.2rem;
`;

export const Location = styled.p`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Time = styled.p`
  color: gray;
  margin-bottom: 1.2rem;
  font-size: 1.2rem;
`;
export const People = styled.p`
  color: gray;
  font-size: 1.2rem;
`;
