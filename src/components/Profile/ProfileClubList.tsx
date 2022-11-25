import {link} from 'fs';
import React, {useState} from 'react';
import {useQuery} from 'react-query';
import {Link, useNavigate} from 'react-router-dom';
import styled, {css} from 'styled-components';
import {memberApis} from '../../api/axiosconfig';
import {clubList, ProfileDataType} from '../../types/regist';
import {getUserId} from '../../utils';

function ProfileClubList({data}: ProfileDataType) {
  const navigate = useNavigate();
  const userId = getUserId();

  console.log('Clublist =>', data?.clubList);
  // 최신순으로 정렬하기 위해

  const today = new Date().getTime();

  const tabList = [
    {tabName: '참석모임', id: 0, isOn: true},
    {tabName: '관심모임', id: 1, isOn: false},
    {tabName: '개설모임', id: 2, isOn: false},
  ];
  const [index, setIndex] = useState(0);

  const {
    data: leaderClubs,
    isLoading,
    error,
  } = useQuery(
    ['getLeaderClubs', userId],
    async () => {
      try {
        const {data} = await memberApis.getLeaderClubs();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      onError: error => {
        throw error;
      },
    },
  );
  const {data: interestClubs} = useQuery(
    ['getInterestClubs', userId],
    async () => {
      try {
        const {data} = await memberApis.getInterestClubs();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      onError: error => {
        throw error;
      },
    },
  );
  const beforeSorting = data?.clubList;
  const beforeSorting2 = leaderClubs?.data;
  const beforeSorting3 = interestClubs?.data;

  const clubListData = beforeSorting?.sort(
    (a, b) => Date.parse(b.startDate!) - Date.parse(a.startDate!),
  );
  const leaderClubsData = beforeSorting2?.sort(
    (a: {startDate: string}, b: {startDate: string}) =>
      Date.parse(b.startDate!) - Date.parse(a.startDate!),
  );
  const interestClubsData = beforeSorting3?.sort(
    (a: {startDate: string}, b: {startDate: string}) =>
      Date.parse(b.startDate!) - Date.parse(a.startDate!),
  );

  return (
    <>
      <StClubsDiv>
        <StClubCategory className="tabList" role="tablist">
          {tabList &&
            tabList.map(v => {
              return (
                <li
                  key={v.id}
                  className={index === v.id ? 'on' : undefined}
                  onClick={() => setIndex(v.id)}>
                  {v.tabName}
                </li>
              );
            })}
        </StClubCategory>
        <StClubListWrapper>
          {index === 0 && (
            <ul>
              {clubListData && clubListData?.length === 0 ? (
                <StClubLi>
                  <div> 참석중인 모임이 없습니다.</div>
                </StClubLi>
              ) : (
                clubListData?.map(item => {
                  return (
                    <>
                      {today > Date.parse(item?.finishDate!) ? (
                        <StGrayLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                          <div>참석 완료</div>
                        </StGrayLi>
                      ) : today < Date.parse(item?.startDate!) ? (
                        <StClubLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                          <div>참석 예정</div>
                        </StClubLi>
                      ) : (
                        <StClubLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                          <div>참석중</div>
                        </StClubLi>
                      )}
                    </>
                  );
                })
              )}
            </ul>
          )}

          {index === 1 && (
            <ul>
              {interestClubsData && interestClubsData?.length === 0 ? (
                <StClubLi>
                  <div> 참석중인 모임이 없습니다.</div>
                </StClubLi>
              ) : (
                interestClubsData?.map((item: clubList) => {
                  return (
                    <>
                      {today > Date.parse(item?.finishDate!) ? (
                        <StGrayLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                        </StGrayLi>
                      ) : today < Date.parse(item?.startDate!) ? (
                        <StClubLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                        </StClubLi>
                      ) : (
                        <StClubLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                        </StClubLi>
                      )}
                    </>
                  );
                })
              )}
            </ul>
          )}

          {index === 2 && (
            <ul>
              {leaderClubsData && leaderClubsData?.length === 0 ? (
                <StClubLi>
                  <div> 참석중인 모임이 없습니다.</div>
                </StClubLi>
              ) : (
                leaderClubsData?.map((item: clubList) => {
                  return (
                    <>
                      {today > Date.parse(item?.finishDate!) ? (
                        <StGrayLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                          <div>참석 완료</div>
                        </StGrayLi>
                      ) : today < Date.parse(item?.startDate!) ? (
                        <StClubLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                          <div>참석 예정</div>
                        </StClubLi>
                      ) : (
                        <StClubLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                          <div>참석중</div>
                        </StClubLi>
                      )}
                    </>
                  );
                })
              )}
            </ul>
          )}
        </StClubListWrapper>
      </StClubsDiv>
    </>
  );
}

export default ProfileClubList;

const StClubsDiv = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fff;
  align-self: flex-end;
  border-radius: 1rem;
  padding: 3rem;
  border: 1px solid ${props => props.theme.MainColor};
  box-shadow: 11px 9px 19px rgba(0, 0, 0, 0.08);
`;
const StClubCategory = styled.ul`
  display: flex;
  .on {
    color: black;
    :after {
      content: '';
      display: block;
      border-bottom: 4px solid ${props => props.theme.MainColor};
      margin: 1rem auto;
      transition: all 0.5s;
    }
  }
  li {
    color: ${props => props.theme.Gray};
    margin-right: 2rem;
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.5s;
    :after {
      content: '';
      display: block;
      border-bottom: 4px solid white;
      margin: 1rem auto;
    }
  }
`;

const StClubListWrapper = styled.div`
  width: 100%;
  height: 85%;
  overflow: auto;
  padding-right: 0.5rem;
`;

const StClubLi = styled.li`
  display: flex;
  justify-content: space-between;
  list-style: none;

  div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${props => props.theme.MainColor};
    border-radius: 0.7rem;
    height: 4rem;
    width: 43rem;
    padding: 0 2rem;
    margin-top: 1rem;
    font-size: 1.7rem;
  }
  div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.MainColor};
    border-radius: 0.7rem;
    height: 4rem;
    width: 13rem;
    padding: 0 2rem;
    margin-top: 1rem;
    font-size: 1.7rem;
  }
  span:nth-child(1) {
    display: flex;
    font-size: 1.5rem;
    overflow: hidden;
  }

  span:nth-child(2) {
    display: flex;
    font-size: 1.5rem;
  }
`;

const StGrayLi = styled(StClubLi)`
  div:nth-child(1) {
    border: 1px solid ${props => props.theme.Gray};
    color: ${props => props.theme.Gray};
  }

  div:nth-child(2) {
    border: 1px solid ${props => props.theme.Gray};
    color: ${props => props.theme.Gray};
  }
`;
