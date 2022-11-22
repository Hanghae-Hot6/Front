export const getAccessToken = () => {
  const getToken = localStorage.getItem('Authorization');
  const accessToken = getToken
    ?.substring(0, getToken.length - 1)
    .substring(1, getToken.length);
  return accessToken;
};
export const getUserId = () => {
  const getUserId = localStorage.getItem('userId');
  const userId = getUserId;
  return userId;
};
