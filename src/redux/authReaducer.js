import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl:null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login,isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login ,isAuth},
});
export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: {captchaUrl},
});
export const getAuthUserData = () => async (dispatch) =>{
  const data = await authAPI.me();
  if (data.resultCode === 0) {
    let { login, id, email} = data.data;
    dispatch(setAuthUserData(id, email, login,true));
  }
}

export const login = (email,password,rememberMe,captcha) => async (dispatch) =>{
  const response = await authAPI.login(email,password,rememberMe,captcha);
  console.log(46)
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData());
    console.log(49)
  } else {
    console.log(51)
    if(response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
      console.log(54)
    }
    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error"
    dispatch(stopSubmit("login",{_error:message}))
  }
}

export const getCaptchaUrl = () => async (dispatch) =>{
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url
  dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch) =>{
  const response = await authAPI.logout()

  if (response.data.resultCode === 0)
    dispatch(setAuthUserData(null,null,null,false));
}


export default authReducer;
