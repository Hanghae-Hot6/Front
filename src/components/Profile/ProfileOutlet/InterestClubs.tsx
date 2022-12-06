import React, {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {Link} from 'react-router-dom';
import {memberApis} from '../../../api/axiosConfig';
import {clubList} from '../../../types/regist';
import {getUserId} from '../../../utils';
import Pagenation from '../Pagenation';
import * as P from '../Profile.style';

function InterestClubs() {
  const userId = getUserId();
  // 총 item 갯수

  const {data: interestClubs} = useQuery(
    ['getInterestClubs', userId],
    async () => {
      try {
        const response = await memberApis.getInterestClubs();
        return response.data;
      } catch (error: any) {}
    },
    {
      onError: error => {
        throw error;
      },
    },
  );
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * limit;

  const total = interestClubs?.data?.length || 1;

  const maxPageNum = Math.ceil(total! / limit);

  const [pageRange, setPageRange] = useState(1);

  const dividingPageNum = Math.ceil(maxPageNum / pageRange);

  if (dividingPageNum < 1) {
    setPageRange(maxPageNum);
  }

  useEffect(() => setPageRange(maxPageNum), [maxPageNum]);
  const today = new Date().getTime();

  const beforeSorting = interestClubs?.data;
  const interestClubsData = beforeSorting?.sort(
    (a: {startDate: string}, b: {startDate: string}) =>
      Date.parse(b.startDate!) - Date.parse(a.startDate!),
  );
  return (
    <P.StOutletWrapper>
      <P.StUl>
        {interestClubsData && interestClubsData?.length === 0 ? (
          <P.StClubLi>
            <div> 참석중인 모임이 없습니다.</div>
          </P.StClubLi>
        ) : (
          interestClubsData
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

export default InterestClubs;
