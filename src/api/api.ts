import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
  baseURL:'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {"API-KEY": "2d125ff6-566c-49e6-b2b5-ccdcd757752f"}
})


export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10
}
export enum CaptchaResCodeEnum {
  CaptchaIsRequired = 10
}

export type GetItemsType = {
  "items":Array<UserType>
  "totalCount": number,
  "error": string | null
}

export type ApiResponseType<D = {},R = ResultCodesEnum > = {
  data:D,
  resultCode:R,
  messages:Array<string>
}