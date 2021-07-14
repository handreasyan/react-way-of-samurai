import {authAPI, ResultCodesEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux_store";
import {Action, Dispatch} from "redux";

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

type ActionsTypes = setAuthUserDataActionType | getCaptchaUrlSuccessActionType | Action;


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

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export const getAuthUserData = ():ThunkType => async (dispatch:DispatchType) =>{
  const data = await authAPI.me();
  if (data.resultCode === ResultCodesEnum.Success) {
    let { login, id, email} = data.data;
    dispatch(setAuthUserData(id, email, login,true));
  }
}

export const login = (email:string,password:string,rememberMe:boolean,captcha:string):ThunkType => async (dispatch:DispatchType) =>{
  const loginData = await authAPI.login(email,password,rememberMe,captcha);
  if (loginData.resultCode === ResultCodesEnum.Success) {
    // @ts-ignore                 ------------------------------------------------------------------------
    dispatch(getAuthUserData());
  } else {
    if(loginData.resultCode === ResultCodesEnum.CaptchaIsRequired) {
      // @ts-ignore    ------------------------------------------------------------------------
      dispatch(getCaptchaUrl());
    }
    let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some Error"
    dispatch(stopSubmit("login",{_error:message}))
  }
}

export const getCaptchaUrl = ():ThunkType => async (dispatch:DispatchType) =>{
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url
  dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = ():ThunkType => async (dispatch:DispatchType) =>{
  const response = await authAPI.logout()

  if (response.data.resultCode === ResultCodesEnum.Success)
    dispatch(setAuthUserData(null,null,null,false));
}


export default authReducer;
