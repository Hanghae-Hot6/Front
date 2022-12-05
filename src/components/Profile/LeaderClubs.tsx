import React, {useState, useEffect} from 'react';

import {useMutation, useQuery} from 'react-query';
import {Link, useNavigate} from 'react-router-dom';
import {clubApis, memberApis} from '../../api/axiosConfig';
import {clubList} from '../../types/regist';
import {getUserId} from '../../utils';
import GlobalModal from '../../common/GlobalModal';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {openGlobalModal} from '../../Redux/modules/slices/modalSlice';
import Pagenation from './Pagenation';
import styled from 'styled-components';
import * as P from './Profile.style';

function LeaderClubs() {
  const userId = getUserId();
  const today = new Date().getTime();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {isGlobalModalOpen, dispatchId} = useAppSelector(
    state => state.modalReducer,
  );

  const [deleteId, setDeleteId] = useState<number | undefined>(0);

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
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * limit;

  const total = leaderClubs?.data?.length || 1;

  const maxPageNum = Math.ceil(total! / limit);

  const [pageRange, setPageRange] = useState(1);

  const dividingPageNum = Math.ceil(maxPageNum / pageRange);

  if (dividingPageNum < 1) {
    setPageRange(maxPageNum);
  }

  useEffect(() => setPageRange(maxPageNum), [maxPageNum]);

  const handleDelete = (clubId: number | undefined) => {
    setDeleteId(clubId);
    dispatch(openGlobalModal('clubDelete'));
    // QueryClient.invalidateQueries(`getLeaderClubs`);
  };

  const beforeSorting = leaderClubs?.data;

  const leaderClubsData = beforeSorting?.sort(
    (a: {startDate: string}, b: {startDate: string}) =>
      Date.parse(b.startDate!) - Date.parse(a.startDate!),
  );

  return (
    <P.StOutletWrapper>
      <P.StUl>
        {leaderClubsData && leaderClubsData?.length === 0 ? (
          <P.StClubLi>
            <div> 참석중인 모임이 없습니다.</div>
          </P.StClubLi>
        ) : (
          leaderClubsData
            ?.slice(offset, offset + limit)
            .map((item: clubList) => {
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
        {isGlobalModalOpen && dispatchId === 'clubDelete' && (
          <GlobalModal
            id="clubDelete"
            type="confirmModal"
            onConfirmCallback={() => deleteMutate(deleteId)}>
            <div>정말 삭제하시겠습니까?</div>
          </GlobalModal>
        )}
      </P.StUl>
      <Pagenation
        page={page}
        pageRange={pageRange}
        limit={limit}
        total={total}
        maxPageNum={maxPageNum}
        setPage={setPage}
        setPageRange={setPageRange}></Pagenation>
    </P.StOutletWrapper>
  );
}

export default LeaderClubs;
