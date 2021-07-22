import {stopSubmit} from "redux-form";
import {PostType, ProfileType, PhotosType} from "../types/types";
import { InferActionsTypes, BaseThunkType} from "./redux_store";
import {profileAPI} from "../api/profile-api";

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
};

const profileReducer = (state:InitialStateType = initialState, action:ActionsTypes):InitialStateType => {
  switch (action.type) {
    case 'SN/PROFILE/ADD_POST':
      let newPost = {id: Math.floor(Math.random() * 1000),post: action.newPostText,likesCount: 0,src:"https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"};
      return { ...state,postsData: [...state.postsData, newPost]};
    case 'SN/PROFILE/SET_USER_PROFILE':
      return { ...state, profile: action.profile };
    case 'SN/PROFILE/SET_STATUS':
      return { ...state, status: action.status };
    case 'SN/PROFILE/DELETE_POST':
      return { ...state, postsData: state.postsData.filter(post => post.id !== action.postId) }
    case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
      return { ...state, profile: {...state.profile,photos:action.photos} as ProfileType }
    default:
      return state;
  }
};
export default profileReducer;

export const actions = {
  addPostActionCreator:(newPostText:string)=> ({type: 'SN/PROFILE/ADD_POST', newPostText} as const),
  setUserProfile: (profile:ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
  setStatus: (status:string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
  deletePost: (postId: number) =>  ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
  savePhotoSuccess: (photos: PhotosType) =>  ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const),
}

export const getUserProfile = (userId:number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(actions.setUserProfile(data));
}
export const getUserStatus = (userId:number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(data));
}
export const updateUserStatus = (status:string): ThunkType => async (dispatch) => {
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
export const savePhoto = (file:File): ThunkType => async (dispatch) => {
  const res = await profileAPI.savePhoto(file);
  if (res.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(res.data.photos));
  } else {
    console.warn('Some Error in Profile Reducer : savePhoto')
  }
}
export const saveProfile = (profile:ProfileType): ThunkType => async (dispatch, getState) => {
  const id = getState().auth.userId
  const data = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0) {

    if(id) dispatch(getUserProfile(id));
    else throw new Error("User ID can't be null")

  } else {
    dispatch(stopSubmit("editProfile",{_error:data.messages[0]}))
    console.warn('Some Error in Profile Reducer 2')
    return Promise.reject(data.messages[0])
  }
}


type ActionsTypes = InferActionsTypes<typeof actions>
export type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>

