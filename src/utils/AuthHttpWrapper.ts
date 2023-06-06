import axios, { AxiosRequestConfig } from 'axios';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import { AuthInfo, JwtTokenDto, SessionToken } from './TypeDef';

export const API_BASE_URL = 'https://ssu-commerce-auth.herokuapp.com';

export const getUserId = async () => cookie.load('userId');
export const getUserRole = async () => cookie.load('userRole');
export const logout = async () => cookie.remove('accessToken');

export const checkLoginStatus = async () => {
  const refreshToken = await cookie.load('refreshToken');
  return refreshToken !== undefined;
};

const setAccessToken = (accessToken: JwtTokenDto) => {
  const decodedToken = jwtDecode<AuthInfo>(accessToken.token);
  cookie.save('userId', decodedToken.id, {
    path: '/',
  });
  cookie.save('userRole', decodedToken.roles[0], {
    path: '/',
  });
  cookie.save('accessToken', accessToken.token, {
    path: '/',
    // secure: true
    // httpOnly: true
  });
};

const setRefreshToken = (refreshToken: JwtTokenDto) => {
  const refreshTokenExpires = new Date(jwtDecode<JwtTokenDto>(refreshToken.token).expiredIn * 1000);
  refreshTokenExpires.setMinutes(refreshTokenExpires.getMinutes() - 1, 0, 0);

  cookie.save('refreshToken', refreshToken.token, {
    path: '/',
    expires: refreshTokenExpires,
    // secure: true
    // httpOnly: true
  });
};

export const setTokens = async (token: SessionToken) => {
  setAccessToken(token.accessToken);
  setRefreshToken(token.refreshToken);
  return true;
};

export const logoutAndDeleteCookies = () => {
  cookie.remove('userId', { path: '/' });
  cookie.remove('userRole', { path: '/' });
  cookie.remove('accessToken', { path: '/' });
  cookie.remove('refreshToken', { path: '/' });
};

const refreshAccessToken = async (token: SessionToken) => {
  return axios
    .post(`${API_BASE_URL}/refresh`, {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    })
    .then(response =>
      setTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      })
    )
    .catch(error => {
      alert(error.response.data.message);
      return false;
    });
};

const checkToken = async () => {
  let accessToken = await cookie.load('accessToken');
  const refreshToken = await cookie.load('refreshToken');
  if (refreshToken !== undefined) {
    if (jwtDecode(accessToken)) {
      if (await refreshAccessToken({ accessToken, refreshToken }))
        accessToken = await cookie.load('accessToken');
      else {
        logoutAndDeleteCookies();
        delete axios.defaults.headers.common.Authorization;
        window.location.href = '/booker';
      }
    }
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else delete axios.defaults.headers.common.Authorization;
};

export const getHttp = async (url: string, config?: AxiosRequestConfig<unknown> | undefined) => {
  return checkToken().then(async () => {
    return axios.get(API_BASE_URL + url, config);
    // .catch(error => { console.log('error : ', error.response.data) });
  });
};

export const postHttp = async (
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig<unknown> | undefined
) => {
  return checkToken().then(async () => {
    return axios.post(API_BASE_URL + url, body, config);
    // .catch(error => { console.log('error : ', error.response.data) });
  });
};

export const putHttp = async (
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig<unknown> | undefined
) => {
  return checkToken().then(async () => {
    return axios.put(API_BASE_URL + url, body, config);
    // .catch(error => { console.log('error : ', error.response.data) });
  });
};

export const deleteHttp = async (url: string, config?: AxiosRequestConfig<unknown> | undefined) => {
  return checkToken().then(async () => {
    return axios.delete(API_BASE_URL + url, config);
    // .catch(error => { console.log('error : ', error.response.data) });
  });
};
