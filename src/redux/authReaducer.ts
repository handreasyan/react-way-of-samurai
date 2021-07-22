import { ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import { InferActionsTypes, BaseThunkType} from "./redux_store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/sercurity-api";

let initialState = {
  userId: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
  captchaUrl:null as string | null
};

const authReducer = (state = initialState, action:ActionsTypes):initialStateType => {
  switch (action.type) {
    case "samurai-network/auth/SET_USER_DATA":
    case "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
export const actions = {
  setAuthUserData(userId:number | null, email:string | null, login:string | null,isAuth:boolean){
    return { type: "samurai-network/auth/SET_USER_DATA", payload: { userId, email, login ,isAuth} } as const
  },
  getCaptchaUrlSuccess(captchaUrl:string){
    return { type: "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS", payload: {captchaUrl} } as const
  },
}


export const login = (email:string,password:string,rememberMe:boolean,captcha:string): ThunkType => async (dispatch) =>{
  const loginData = await authAPI.login(email,password,rememberMe,captcha);
  if (loginData.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserData());
  } else {
    if(loginData.resultCode === ResultCodesEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    }
    let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some Error"
    dispatch(stopSubmit("login",{_error:message}))
  }
}

export const getAuthUserData = (): ThunkType => async (dispatch) =>{
  const data = await authAPI.me();
  if (data.resultCode === ResultCodesEnum.Success) {
    let { login, id, email} = data.data;
    dispatch(actions.setAuthUserData(id, email, login,true));
  }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) =>{
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export const logout = (): ThunkType => async (dispatch) =>{
  const response = await authAPI.logout()

  if (response.data.resultCode === ResultCodesEnum.Success)
    dispatch(actions.setAuthUserData(null,null,null,false));
}


export default authReducer;


type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>
type ActionsTypes = InferActionsTypes<typeof actions>
export type initialStateType = typeof initialState;