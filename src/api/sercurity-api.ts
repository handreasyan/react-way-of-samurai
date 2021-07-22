import {instance} from "./api";

type getCaptchaUrlType = {
  url:string
}

export const securityAPI = {
  getCaptchaUrl(){
    return instance.get<getCaptchaUrlType>(`security/get-captcha-url`).then(res => res.data);
  }
}
