import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PostType, ProfileType,PhotosType} from "../types/types";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";


let initialState = {
  postsData: [
    {
      id: 1,
      post: "Hello , How are you ?",
      likesCount: 15,
      src:
        "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
    },
    {
      id: 2,
      post: "It's My First Post !",
      likesCount: 11,
      src:
        "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png",
    },
    {
      id: 3,
      post: "Hello, I am Jane ",
      likesCount: 20,
      src:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png",
    },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
  newPostText:''
};
export type InitialStateType = typeof initialState


const profileReducer = (state:InitialStateType = initialState, action:any):InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: Math.floor(Math.random() * 1000),
        post: action.newPostText,
        likesCount: 0,
        src:
          "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
      };
      return {
        ...state,
        postsData: [...state.postsData, newPost],
        newPostText: "",
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter(post => post.id !== action.postId)
      }
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: {...state.profile,photos:action.photos} as ProfileType, // jamanakavor !!!!!
      }
    default:
      return state;
  }
};
export default profileReducer;

type AddPostActionCreatorType = {
  type:typeof ADD_POST,
  newPostText:string
}
export const addPostActionCreator = (newPostText:string):AddPostActionCreatorType => ({type: ADD_POST, newPostText});

type SetUserProfileActionType = {
  type:typeof SET_USER_PROFILE,
  profile:ProfileType
}
export const setUserProfile = (profile:ProfileType):SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type SetStatusActionType = { type:typeof SET_STATUS, status:string}
export const setStatus = (status:string):SetStatusActionType => ({type: SET_STATUS, status});

type DeletePostActionType = { type:typeof DELETE_POST, postId:number}
export const deletePost = (postId:number):DeletePostActionType => ({type: DELETE_POST, postId});

type SavePhotoSuccessActionType = { type:typeof SAVE_PHOTO_SUCCESS, photos:PhotosType}
export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos});

export const getUserProfile = (userId:number) => async (dispatch:any) => {
  const data = await usersAPI.getOneUser(userId);
  dispatch(setUserProfile(data));
}
export const getUserStatus = (userId:number) => async (dispatch:any) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(setStatus(data));
}
export const updateUserStatus = (status:string) => async (dispatch:any) => {
  try{
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(setStatus(status));
    } else {
      alert(data.messages[0])
      console.warn('Some Error in Profile Reducer : updateUserStatus ')
    }
  } catch (error) {
    console.log(error)
  }
}
export const savePhoto = (file:Object) => async (dispatch:any) => {
  const data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(savePhotoSuccess(data.data.photos));
  } else {
    console.warn('Some Error in Profile Reducer : savePhoto')
  }
}
export const saveProfile = (profile:ProfileType) => async (dispatch:any,getState:any) => {
  const id = getState().auth.userId
  const data = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0) {
   dispatch(getUserProfile(id));
  } else {
    dispatch(stopSubmit("editProfile",{_error:data.messages[0]}))
    console.warn('Some Error in Profile Reducer 2')
    return Promise.reject(data.messages[0])
  }
}
