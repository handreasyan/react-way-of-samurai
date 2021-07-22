import {PhotosType, ProfileType} from "../types/types";
import {instance,ApiResponseType} from "./api";

type SavePhotoResDataType = {
  photos:PhotosType
}

export const profileAPI = {
  getProfile(userId:number){
    return instance.get<ProfileType>(`profile/${userId}`).then((res) => res.data);
  },
  getStatus(userId:number){
    return instance.get<string>(`profile/status/${userId}`).then((res) => res.data);
  },
  updateStatus:(status:string)=>{
    return instance.put<ApiResponseType>(`profile/status`,{status}).then((res) => res.data);
  },
  savePhoto(photoFile:File) {
    const formData = new FormData();
    formData.append("image",photoFile);
    return instance.put<ApiResponseType<SavePhotoResDataType>>(`profile/photo`,formData,{
      headers:{'Content-Type':'multipart/form-data'}
    })
      .then((response) => response.data);
  },
  saveProfile(profile:ProfileType) {
    return instance.put<ApiResponseType>(`profile`,profile).then((res) => res.data);
  }
}
