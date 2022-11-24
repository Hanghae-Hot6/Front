export const getAccessToken = () => {
  const getToken = localStorage.getItem('Authorization');
  const accessToken = getToken
    ?.substring(0, getToken.length - 1)
    .substring(1, getToken.length);
  return accessToken;
};
export const getUserId = () => {
  const getUserId = localStorage.getItem('userId');
  const userId = getUserId
    ?.substring(0, getUserId.length - 1)
    .substring(1, getUserId.length);
  if (!userId) {
    return null;
  }
  return userId;
};
export const getUserIdFixed = () => {
  const getUserId = localStorage.getItem('userId');
  const userId = getUserId
    ?.substring(0, getUserId.length - 1)
    .substring(1, getUserId.length);
  return userId;
};
export const getRefreshToken = () => {
  const getRefreshToken = localStorage.getItem('Refresh-Token');
  const refreshToken = getRefreshToken
    ?.substring(0, getRefreshToken.length - 1)
    .substring(1, getRefreshToken.length);
  return refreshToken;
};
