import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objects-helpers";
import { UserType} from "../types/types";
import {AppStateType} from "./redux_store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";


const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";


let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of users id
};

type InitialStateType = typeof initialState;

type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType |
  SetTotalUserCountActionType | SetCurrentPageActionType | ToggleIsFetchingActionType | TogFolInProgActionType;

const usersReducer = (state:InitialStateType = initialState, action:ActionsTypes):InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users,action.userId,'id',{followed: true})
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users,action.userId,'id',{followed: false})
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalCount,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id:number) => id !== action.userId),
      };
    default:
      return state;
  }
};
export default usersReducer;

// action creators
type FollowSuccessActionType = {type:typeof FOLLOW,userId:number}
export const followSuccess = (userId:number):FollowSuccessActionType => ({type: FOLLOW, userId});

type UnfollowSuccessActionType = {type:typeof UNFOLLOW,userId:number}
export const unfollowSuccess = (userId:number):UnfollowSuccessActionType => ({type: UNFOLLOW, userId});

type SetUsersActionType = {type:typeof SET_USERS,users:Array<UserType>}
export const setUsers = (users:Array<UserType>):SetUsersActionType => ({type: SET_USERS, users});

type SetTotalUserCountActionType = {type:typeof SET_TOTAL_USERS_COUNT,totalCount:number}
export const setTotalUserCount = (totalCount:number):SetTotalUserCountActionType => ({type: SET_TOTAL_USERS_COUNT,totalCount});

type SetCurrentPageActionType = {type:typeof SET_CURRENT_PAGE,currentPage:number}
export const setCurrentPage = (currentPage:number):SetCurrentPageActionType => ({type: SET_CURRENT_PAGE,currentPage});

type ToggleIsFetchingActionType = {type:typeof TOGGLE_IS_FETCHING,isFetching:boolean}
export const toggleIsFetching = (isFetching:boolean):ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});


type TogFolInProgActionType = {type:typeof TOGGLE_IS_FOLLOWING_PROGRESS,isFetching:boolean,userId:number}
export const toggleFollowingInProgress = (isFetching:boolean, userId:number):TogFolInProgActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,isFetching,userId});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page:number, pageSize:number):ThunkType => (
  async (dispatch,getState) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUserCount(data.totalCount));
  }
);

type DispatchType = Dispatch<ActionsTypes>
type helperActionType = (id:number)=>FollowSuccessActionType | UnfollowSuccessActionType

const _followUnfollowFlow = async (dispatch:DispatchType,id:number,apiMethod:string,actionCreator:helperActionType) => {
  dispatch(toggleFollowingInProgress(true, id));

  // @ts-ignore       =================================================================
  const response = await usersAPI[apiMethod].call(usersAPI,id);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(id));
  } else {
    alert("Please Log In");
  }
  dispatch(toggleFollowingInProgress(false, id));
}
export const follow = (id:number):ThunkType => async (dispatch) => {
  _followUnfollowFlow(dispatch,id,'follow',followSuccess);
}
export const unfollow = (id:number):ThunkType => async (dispatch) => {
  _followUnfollowFlow(dispatch,id,'unFollow',unfollowSuccess);

}



