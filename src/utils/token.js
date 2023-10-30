import jwtDecode from 'jwt-decode';

export const hasExpiredToken = () => {
    const { exp } = jwtDecode(token);
  const currentData = new Date().getTime();
  if (currentData > exp) {
    return true;
  }
    return false;
}