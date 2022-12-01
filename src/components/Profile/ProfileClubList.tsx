import axios from 'axios';
import {link} from 'fs';
import React, {useEffect, useState} from 'react';
import {QueryClient, useMutation, useQuery} from 'react-query';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {clubApis, memberApis} from '../../api/axiosConfig';
import GlobalModal from '../../common/GlobalModal';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {clubList, ProfileDataType} from '../../types/regist';
import {getAccessToken, getRefreshToken, getUserId} from '../../utils';
import * as P from './Profile.style';
function ProfileClubList({data}: ProfileDataType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = getUserId();
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );

  const [deleteId, setDeleteId] = useState<number | undefined>(0);

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
    refetch: leaderRefetch,
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
      } catch (error: any) {}
    },
    {
      onError: error => {
        throw error;
      },
    },
  );

  const {mutate: deleteMutate} = useMutation(
    async (clubId: number | undefined) => {
      try {
        const response = await clubApis.deleteClub(clubId);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: () => {
        leaderRefetch();
      },
      onError: error => {},
    },
  );

  const handleDelete = (clubId: number | undefined) => {
    dispatch(openGlobalModal('clubDelete'));
    setDeleteId(clubId);
    // QueryClient.invalidateQueries(`getLeaderClubs`);
  };

  // 최신순으로 정렬하기 위해
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
      <P.StClubsDiv>
        <P.StClubCategory className="tabList" role="tablist">
          {tabList &&
            tabList.map((v, idx) => {
              return (
                <li
                  key={v.id}
                  className={index === v.id ? 'on' : undefined}
                  onClick={() => setIndex(v.id)}>
                  {v.tabName}
                </li>
              );
            })}
        </P.StClubCategory>
        <P.StClubListWrapper>
          {index === 0 && (
            <ul>
              {clubListData && clubListData?.length === 0 ? (
                <P.StClubLi>
                  <div> 참석중인 모임이 없습니다.</div>
                </P.StClubLi>
              ) : (
                clubListData?.map(item => {
                  return (
                    <div key={item.clubId}>
                      {today > Date.parse(item?.finishDate!) ? (
                        <P.StGrayLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                          <div>참석 완료</div>
                        </P.StGrayLi>
                      ) : today < Date.parse(item?.startDate!) ? (
                        <P.StClubLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                          <div>참석 예정</div>
                        </P.StClubLi>
                      ) : (
                        <P.StClubLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                          <div>참석중</div>
                        </P.StClubLi>
                      )}
                    </div>
                  );
                })
              )}
            </ul>
          )}

          {index === 1 && (
            <ul>
              {interestClubsData && interestClubsData?.length === 0 ? (
                <P.StClubLi>
                  <div> 참석중인 모임이 없습니다.</div>
                </P.StClubLi>
              ) : (
                interestClubsData?.map((item: clubList) => {
                  return (
                    <div key={item.clubId}>
                      {today > Date.parse(item?.finishDate!) ? (
                        <P.StGrayLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                        </P.StGrayLi>
                      ) : today < Date.parse(item?.startDate!) ? (
                        <P.StClubLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                        </P.StClubLi>
                      ) : (
                        <P.StClubLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                        </P.StClubLi>
                      )}
                    </div>
                  );
                })
              )}
            </ul>
          )}

          {index === 2 && (
            <ul>
              {leaderClubsData && leaderClubsData?.length === 0 ? (
                <P.StClubLi>
                  <div> 참석중인 모임이 없습니다.</div>
                </P.StClubLi>
              ) : (
                leaderClubsData?.map((item: clubList) => {
                  return (
                    <div key={item.clubId}>
                      {today > Date.parse(item?.finishDate!) ? (
                        <P.StGrayLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                          <button onClick={() => handleDelete(item?.clubId)}>
                            클럽삭제
                          </button>
                        </P.StGrayLi>
                      ) : today < Date.parse(item?.startDate!) ? (
                        <P.StClubLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                          <button onClick={() => handleDelete(item?.clubId)}>
                            클럽삭제
                          </button>
                        </P.StClubLi>
                      ) : (
                        <P.StClubLi key={item.clubId}>
                          <Link to={`/club_detail/${item?.clubId}`}>
                            <div>
                              <span>{item.clubName}</span>
                              <span>
                                {item.startDate} ~ {item.finishDate}
                              </span>
                            </div>
                          </Link>
                          <button onClick={() => handleDelete(item?.clubId)}>
                            클럽삭제
                          </button>
                        </P.StClubLi>
                      )}
                    </div>
                  );
                })
              )}
            </ul>
          )}
        </P.StClubListWrapper>
        {isGlobalModalOpen && dispatchId === 'clubDelete' && (
          <GlobalModal
            id="clubDelete"
            type="confirmModal"
            onConfirmCallback={() => deleteMutate(deleteId)}>
            <div>정말 삭제하시겠습니까?</div>
          </GlobalModal>
        )}
      </P.StClubsDiv>
    </>
  );
}

export default ProfileClubList;
