import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS";

export type initialStateType = typeof initialState;

let initialState = {
  userId: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
  captchaUrl:null as string | null
};

const authReducer = (state = initialState, action:any):initialStateType => {
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

type setAuthUserDataActionPayloadType = {
  userId:number | null,
  email:string | null,
  login:string | null,
  isAuth:boolean
}
type setAuthUserDataActionType = {
  type:typeof SET_USER_DATA,
  payload:setAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId:number | null, email:string | null, login:string | null,isAuth:boolean):setAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login ,isAuth},
});

type getCaptchaUrlSuccessActionType = {
  type:typeof GET_CAPTCHA_URL_SUCCESS,
  payload:{captchaUrl:string}
}
export const getCaptchaUrlSuccess = (captchaUrl:string):getCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: {captchaUrl},
});

export const getAuthUserData = () => async (dispatch:any) =>{
  const data = await authAPI.me();
  if (data.resultCode === 0) {
    let { login, id, email} = data.data;
    dispatch(setAuthUserData(id, email, login,true));
  }
}

export const login = (email:string,password:string,rememberMe:boolean,captcha:string) => async (dispatch:any) =>{
  const response = await authAPI.login(email,password,rememberMe,captcha);
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if(response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error"
    dispatch(stopSubmit("login",{_error:message}))
  }
}

export const getCaptchaUrl = () => async (dispatch:any) =>{
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url
  dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch:any) =>{
  const response = await authAPI.logout()

  if (response.data.resultCode === 0)
    dispatch(setAuthUserData(null,null,null,false));
}


export default authReducer;
