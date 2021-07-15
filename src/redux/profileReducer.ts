import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PostType, ProfileType, PhotosType, UserType} from "../types/types";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux_store";

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


const profileReducer = (state:InitialStateType = initialState, action:ActionsTypes):InitialStateType => {
  switch (action.type) {
    case 'ADD_POST':
      let newPost = {id: Math.floor(Math.random() * 1000),post: action.newPostText,likesCount: 0,src:"https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"};
      return { ...state,postsData: [...state.postsData, newPost],newPostText: "" };
    case 'SET_USER_PROFILE':
      return { ...state, profile: action.profile };
    case 'SET_STATUS':
      return { ...state, status: action.status };
    case 'DELETE_POST':
      return { ...state, postsData: state.postsData.filter(post => post.id !== action.postId) }
    case 'SAVE_PHOTO_SUCCESS':
      return { ...state, profile: {...state.profile,photos:action.photos} as ProfileType }
    default:
      return state;
  }
};
export default profileReducer;

type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
  addPostActionCreator(newPostText:string) {
    return {type: 'ADD_POST', newPostText} as const
  },
  setUserProfile: (profile:ProfileType) => {
    return {type: 'SET_USER_PROFILE', profile} as const
  },
  setStatus: (status:string) => {
    return {type: 'SET_STATUS', status} as const
  },
  deletePost: (postId: number) => {
    return {type: 'DELETE_POST', postId} as const
  },
  savePhotoSuccess: (photos: PhotosType) => {
    return {type: 'SAVE_PHOTO_SUCCESS', photos} as const
  },
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
type DispatchType = ThunkDispatch<Promise<void>, unknown, ActionsTypes>

export const getUserProfile = (userId:number):ThunkType => async (dispatch:DispatchType) => {
  const data = await usersAPI.getOneUser(userId);
  dispatch(actions.setUserProfile(data));
}
export const getUserStatus = (userId:number):ThunkType => async (dispatch:DispatchType) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(data));
}
export const updateUserStatus = (status:string):ThunkType => async (dispatch:DispatchType) => {
  try{
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(actions.setStatus(status));
    } else {
      alert(data.messages[0])
      console.warn('Some Error in Profile Reducer : updateUserStatus ')
    }
  } catch (error) {
    console.log(error)
  }
}
export const savePhoto = (file:Object):ThunkType => async (dispatch:DispatchType) => {
  const data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos));
  } else {
    console.warn('Some Error in Profile Reducer : savePhoto')
  }
}
export const saveProfile = (profile:ProfileType):ThunkType => async (dispatch:DispatchType,getState:any) => {
  const id = getState().auth.userId
  const data = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0) {
    // @ts-ignore
    dispatch(getUserProfile(id));
  } else {
    // @ts-ignore
    dispatch(stopSubmit("editProfile",{_error:data.messages[0]}))
    console.warn('Some Error in Profile Reducer 2')
    return Promise.reject(data.messages[0])
  }
}

