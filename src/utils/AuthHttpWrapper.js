import axios from 'axios';
import cookie from 'react-cookies'
import jwt_decode from "jwt-decode";

export const API_BASE_URL = "http://localhost:5555";

export const getUserId = async () => cookie.load('userId');
export const getUserRole = async () => cookie.load('userRole');
export const logout = async () => cookie.remove('accessToken');

export const getHttp = async (url, config) => {
    return await checkToken()
        .then(async () => {
            return await axios.get(API_BASE_URL + url, config)
            //.catch(error => { console.log('error : ', error.response.data) });
        });
};

export const postHttp = async (url, body, config) => {
    return await checkToken()
        .then(async () => {
            return await axios.post(API_BASE_URL + url, body, config)
            //.catch(error => { console.log('error : ', error.response.data) });
        })
};

export const putHttp = async (url, body, config) => {
    return await checkToken()
        .then(async () => {
            return await axios.put(API_BASE_URL + url, body, config)
            //.catch(error => { console.log('error : ', error.response.data) });
        })
};

export const deleteHttp = async (url, config) => {
    return await checkToken()
        .then(async () => {
            return await axios.delete(API_BASE_URL + url, config)
            //.catch(error => { console.log('error : ', error.response.data) });
        });
};

export const setTokens = async (accessToken, refreshToken) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
};

export const checkLoginStatus = async () => {
    let refreshToken = await cookie.load('refreshToken');
    return refreshToken !== undefined;
};

// TODO Refresh 로직 생각 필요
const checkToken = async () => {
    let accessToken = await cookie.load('accessToken');
    let refreshToken = await cookie.load('refreshToken');
    if (refreshToken !== undefined) {
        if (jwt_decode(accessToken)) {
            await refreshAccessToken(refreshToken);
            accessToken = await cookie.load('accessToken');
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else
        delete axios.defaults.headers.common['Authorization'];
};

const refreshAccessToken = async (refreshToken) => {
    return await axios.post(API_BASE_URL + "/refresh", {refreshToken: refreshToken})
        .then((response) => response.data.accessToken)
        .then((token) => setAccessToken(token))
        .catch(error => {
            console.log('error : ', error.response.data)
        });
};

const setAccessToken = (accessToken) => {
    let decodedToken = jwt_decode(accessToken.token);
    cookie.save('userId', decodedToken.id,
        {
            path: '/',
        });
    cookie.save('userRole', decodedToken.roles[0],
        {
            path: '/',
        });
    cookie.save('accessToken', accessToken,
        {
            path: '/',
            //secure: true
            //httpOnly: true
        });
};

const setRefreshToken = (refreshToken) => {
    const refreshTokenExpires = new Date(jwt_decode(refreshToken.token).exp * 1000);
    refreshTokenExpires.setMinutes(refreshTokenExpires.getMinutes() - 1, 0, 0);

    cookie.save('refreshToken', refreshToken,
        {
            path: '/',
            expires: refreshTokenExpires,
            //secure: true
            //httpOnly: true
        });
};

export const logoutAndDeleteCookies = () => {
    cookie.remove("userId")
    cookie.remove("userRole")
    cookie.remove("accessToken")
    cookie.remove("refreshToken")
}