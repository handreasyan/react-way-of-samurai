import axios from "axios";
import {ProfileType} from "../types/types";


const instance = axios.create({
  baseURL:'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {"API-KEY": "2d125ff6-566c-49e6-b2b5-ccdcd757752f"}
})

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10){
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => response.data);
  },
  getOneUser(userId:number){
    return profileAPI.getProfile(userId)
    console.warn("You use the old version for getProfile Method : ./src/api/api.js")
    //return instance.get(`profile/${userId}`).then((response) => response.data);
  },
  unFollow(id:number){
    return instance.delete(`follow/${id}`)
  },
  follow(id:number){
    return instance.post(`follow/${id}`)
  }
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10
}
export enum CaptchaResCodeEnum {
  CaptchaIsRequired = 10
}
type MeResponseType = {
  resultCode:ResultCodesEnum,
  messages:Array<string>
  data:{ id:number, email:string, login:string },
}
type LoginResponseType = {
  resultCode:ResultCodesEnum | CaptchaResCodeEnum,
  messages:Array<string>
  data:{ userId:number },
}
export const authAPI = {
  me(){
    return instance.get<MeResponseType>(`auth/me`).then((response) => response.data);
  },
  login(email:string,password:string,rememberMe= false,captcha:null | string = null){
    return instance.post<LoginResponseType>(`auth/login`,{ email,password,rememberMe,captcha }).then(res=>res.data);
  },
  logout(){
    return instance.delete(`auth/login`);
  }
}



export const profileAPI = {
  getProfile(userId:number){
    return instance.get<ProfileType>(`profile/${userId}`).then((response) => response.data);
  },
  getStatus(userId:number){
    return instance.get(`profile/status/${userId}`).then((response) => response.data);
  },
  updateStatus:(status:string)=>{
    return instance.put(`profile/status`,{status}).then((response) => response.data);
  },
  savePhoto(photoFile:any) {
    const formData = new FormData();
    formData.append("image",photoFile[0]);
    return instance.put(`profile/photo`,formData,{
      headers:{'Content-Type':'multipart/form-data'}
    })
      .then((response) => response.data);
  },
  saveProfile(profile:ProfileType) {
    return instance.put(`profile`,profile).then((response) => response.data);
  }
}

export const securityAPI = {
  getCaptchaUrl(){
    return instance.get(`security/get-captcha-url`);
  }
}
