import {CaptchaResCodeEnum, instance, ResultCodesEnum,ApiResponseType} from "./api";


type MeResponseType = ApiResponseType<{ id:number, email:string, login:string }>
type LoginResponseType = ApiResponseType<{ userId:number },ResultCodesEnum | CaptchaResCodeEnum>


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
