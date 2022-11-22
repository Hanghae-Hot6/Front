import {link} from 'fs';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled, {css} from 'styled-components';

// type ClubListProps = {
//   clubName: string;
//   contents: string;
//   category: string;
//   summary: string;
// }[];

// {clubList}: {clubList: ClubListProps}
// type ActiveType = {
//   readonly isActive: boolean;
// };

function ProfileClubList() {
  const navigate = useNavigate();
  const tabList = [
    {tabName: '참석모임', id: 0, isOn: true},
    {tabName: '관심모임', id: 1, isOn: false},
    {tabName: '개설모임', id: 2, isOn: false},
  ];
  const [index, setIndex] = useState(0);
  return (
    <>
      <StScheduleDiv>
        <p>현재 ...님의 일정이에요!</p>
      </StScheduleDiv>
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
        <StClubLi>
          <div>
            <span>title</span>
            <span>22.11.21</span>
          </div>
          <div>참석완료</div>
        </StClubLi>

        <StClubLi></StClubLi>
      </StClubsDiv>
    </>
  );
}

export default ProfileClubList;

const StScheduleDiv = styled.div`
  height: 35%;
  width: 100%;
  background-color: #fff;
  border: 1px solid ${props => props.theme.MainColor};
  border-radius: 1rem;
  box-shadow: 11px 9px 19px rgba(0, 0, 0, 0.08);
  padding: 3.5rem;
  p {
    font-size: 2rem;
    font-weight: bold;
  }
`;
const StClubsDiv = styled.div`
  height: 65%;
  width: 100%;
  background-color: #fff;
  margin-top: 1rem;
  align-self: flex-end;
  border-radius: 1rem;
  padding: 3.5rem;
  border: 1px solid ${props => props.theme.MainColor};
  box-shadow: 11px 9px 19px rgba(0, 0, 0, 0.08);
`;
const StClubCategory = styled.ul`
  display: flex;
  .on {
    :after {
      content: '';
      display: block;
      border-bottom: 4px solid ${props => props.theme.MainColor};
      margin: 1rem auto;
      transition: all 0.5s;
    }
  }
  li {
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
    width: 45rem;
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
  span {
    display: flex;
  }
`;

// {clubList.map((club, index) => (
//   <>
//     <div>{club.category}</div>
//     <div>{club.clubName}</div>
//     <div>{club.contents}</div>
//     <div>{club.summary}</div>
//   </>
// ))}
