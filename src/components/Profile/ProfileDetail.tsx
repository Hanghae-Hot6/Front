type clubListProps = {
  clubName: string;
  contents: string;
  category: string;
  summary: string;
};
type ProfileDataProps = {
  memberId: string;
  email: string;
  nickname: string;
  address: string;
  phoneNumber: string;
  password: string;
  passwordCheck: string;
  clubList: clubListProps[];
};

function ProfileDetail({data}: {data: ProfileDataProps}) {
  return (
    <>
      <div>{data.address}</div>
      <div>{data.email}</div>
      <div>{data.memberId}</div>
      <div>{data.nickname}</div>
      <div>{data.password}</div>
    </>
  );
}

export default ProfileDetail;
