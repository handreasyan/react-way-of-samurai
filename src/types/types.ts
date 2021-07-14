
//    lesson 6th ___ https://www.youtube.com/watch?v=fltI2uTv12c&list=PLcvhF2Wqh7DM3z1XqMw0kPuxpbyMo3HvN&index=6&ab_channel=IT-KAMASUTRA


export type PostType = {
  id: number,
  post: string,
  likesCount: number,
  src:string,
}
export type ContactsType = {
  "facebook": string | null,
  "website": string | null,
  "vk": string | null,
  "twitter": string | null,
  "instagram": string | null,
  "youtube": string | null,
  "github": string | null ,
  "mainLink": string | null
}
export type PhotosType = {
  small:  string | null,
  large:  string | null
}
export type ProfileType = {
  aboutMe:  string | null,
  lookingForAJob: boolean,
  lookingForAJobDescription:  string | null,
  fullName: string | null,
  userId: number,
  contacts: ContactsType,
  photos: PhotosType
}


export type UserType = {
  "name": null | string,
  "id": number,
  "uniqueUrlName": null | string,
  "photos": PhotosType,
  "status": null | string,
  "followed": boolean
}