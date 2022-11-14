import React from 'react';

type ClubListProps = {
  clubName: string;
  contents: string;
  category: string;
  summary: string;
}[];

function ProfileClubList({clubList}: {clubList: ClubListProps}) {
  console.log(clubList);
  return (
    <>
      {clubList.map((club, index) => (
        <>
          <div>{club.category}</div>
          <div>{club.clubName}</div>
          <div>{club.contents}</div>
          <div>{club.summary}</div>
        </>
      ))}
    </>
  );
}

export default ProfileClubList;
