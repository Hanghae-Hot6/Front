import React from 'react';
import {ReactQueryDevtools} from 'react-query/devtools';

type ProfilePageProps = {};

const ProfilePage = ({}: ProfilePageProps) => {
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};
export default ProfilePage;
