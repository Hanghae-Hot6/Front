import {useState, useEffect} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {ProfileDataType} from '../../types/regist';
import {getUserId} from '../../utils';
import Pagenation from './Pagenation';
import * as P from './Profile.style';

function ProfileClubList({data}: ProfileDataType) {
  const navigate = useNavigate();
  const userId = getUserId();
  // 총 item 갯수
  const total = data?.clubList?.length || 1;

  //페이지당 게시물 수
  const [limit, setLimit] = useState(8);
  //현재 페이지 번호
  const [page, setPage] = useState(1);

  // page가 n이라면 n번째 게시물의 위치(index)
  const offset = (page - 1) * limit;

  // 최대 페이지 갯수
  const maxPageNum = Math.ceil(total! / limit);

  // 한번에 표시할 페이지 갯수
  const [pageRange, setPageRange] = useState(1);

  // 등분할 페이지 갯수
  const dividingPageNum = Math.ceil(maxPageNum / pageRange);

  //등분할 페이지 갯수가 1보다 작거나 같은 경우는 최대페이지 갯수를 페이지 범위로 설정한다.
  if (dividingPageNum < 1) {
    setPageRange(maxPageNum);
  }

  useEffect(() => setPageRange(maxPageNum), [maxPageNum]);
  const today = new Date().getTime();

  const tabList = [
    {tabName: '참석모임', id: 0, isOn: true},
    {tabName: '관심모임', id: 1, isOn: false},
    {tabName: '개설모임', id: 2, isOn: false},
  ];
  const [index, setIndex] = useState(0);

  // 최신순으로 정렬하기 위해
  const beforeSorting = data?.clubList;

  const clubListData = beforeSorting?.sort(
    (a, b) => Date.parse(b.startDate!) - Date.parse(a.startDate!),
  );

  return (
    <P.StClubsDiv>
      <P.StClubCategory className="tabList" role="tablist">
        {tabList &&
          tabList.map((v, idx) => {
            return (
              <li
                key={v.id}
                className={index === v.id ? 'on' : undefined}
                onClick={() => {
                  setIndex(v.id);
                  if (v.id === 0) {
                    navigate(`/profile/${userId}`);
                  } else if (v.id === 1) {
                    navigate(`/profile/${userId}/interest`);
                  } else if (v.id === 2) {
                    navigate(`/profile/${userId}/leader`);
                  }
                }}>
                {v.tabName}
              </li>
            );
          })}
      </P.StClubCategory>
      <P.StClubListWrapper>
        {index !== 0 && (
          <Outlet
            context={{
              page,
              pageRange,
              limit,
              total,
              maxPageNum,
              offset,
              setPage,
              setPageRange,
            }}></Outlet>
        )}
        {index === 0 && (
          <P.StUl>
            {clubListData && clubListData?.length === 0 ? (
              <P.StClubLi>
                <div> 참석중인 모임이 없습니다.</div>
              </P.StClubLi>
            ) : (
              clubListData?.slice(offset, offset + limit).map(item => {
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
          </P.StUl>
        )}

        {index === 0 && (
          <Pagenation
            page={page}
            pageRange={pageRange}
            limit={limit}
            total={total}
            maxPageNum={maxPageNum}
            setPage={setPage}
            setPageRange={setPageRange}></Pagenation>
        )}
      </P.StClubListWrapper>
    </P.StClubsDiv>
  );
}

export default ProfileClubList;
