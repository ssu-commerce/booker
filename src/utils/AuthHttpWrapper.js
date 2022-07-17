import axios from 'axios';
import cookie from 'react-cookies'
import jwt_decode from "jwt-decode";

export const API_BASE_URL = "https://ssu-commerce-auth.herokuapp.com";

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
    return true
};

export const checkLoginStatus = async () => {
    let refreshToken = await cookie.load('refreshToken');
    return refreshToken !== undefined;
};

const checkToken = async () => {
    let accessToken = await cookie.load('accessToken');
    let refreshToken = await cookie.load('refreshToken');
    if (refreshToken !== undefined) {
        if (jwt_decode(accessToken)) {
            if (await refreshAccessToken(accessToken, refreshToken))
                accessToken = await cookie.load('accessToken');
            else {
                logoutAndDeleteCookies()
                delete axios.defaults.headers.common['Authorization'];
                window.location.href = "/booker"
            }
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else
        delete axios.defaults.headers.common['Authorization'];
};

const refreshAccessToken = async (accessToken, refreshToken) => {
    return await axios.post(API_BASE_URL + "/refresh", {accessToken: accessToken, refreshToken: refreshToken})
        .then((response) => setTokens(response.data.accessToken, response.data.refreshToken))
        .catch(error => {
            alert(error.response.data.message)
            return false
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
    cookie.save('accessToken', accessToken.token,
        {
            path: '/',
            //secure: true
            //httpOnly: true
        });
};

const setRefreshToken = (refreshToken) => {
    const refreshTokenExpires = new Date(jwt_decode(refreshToken.token).exp * 1000);
    refreshTokenExpires.setMinutes(refreshTokenExpires.getMinutes() - 1, 0, 0);

    cookie.save('refreshToken', refreshToken.token,
        {
            path: '/',
            expires: refreshTokenExpires,
            //secure: true
            //httpOnly: true
        });
};

export const logoutAndDeleteCookies = () => {
    cookie.remove("userId", {path: '/',})
    cookie.remove("userRole", {path: '/',})
    cookie.remove("accessToken", {path: '/',})
    cookie.remove("refreshToken", {path: '/',})
}