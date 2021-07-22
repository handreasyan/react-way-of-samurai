import {updateObjectInArray} from "../utils/objects-helpers";
import {UserType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux_store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of users id
};

const usersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SN/USERS/FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
      };
    case 'SN/USERS/UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
      };
    case 'SN/USERS/SET_USERS':
      return {...state, users: action.users};
    case 'SN/USERS/SET_CURRENT_PAGE':
      return {...state, currentPage: action.currentPage};
    case 'SN/USERS/SET_TOTAL_USERS_COUNT':
      return {...state, totalUsersCount: action.totalCount};
    case 'SN/USERS/TOGGLE_IS_FETCHING':
      return {...state, isFetching: action.isFetching};
    case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
      return {
        ...state,
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id: number) => id !== action.userId),
      };
    default:
      return state;
  }
};

export const actions = {
  followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),
  unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),
  setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
  setTotalUserCount: (totalCount: number) => ({type: 'SN/USERS/SET_TOTAL_USERS_COUNT', totalCount} as const),
  setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
  toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),
  toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({ type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',isFetching,userId} as const),
}

export const requestUsers = (page: number, pageSize: number): ThunkType => (
  async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));

    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUserCount(data.totalCount));
  }
);

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, id: number, apiMethod: string, actionCreator: (id: number) => ActionsTypes) => {
  dispatch(actions.toggleFollowingInProgress(true, id));

  // @ts-ignore       =================================================================
  const data = await usersAPI[apiMethod].call(usersAPI, id);
  if (data.resultCode === 0) {
    console.log(2222)
    dispatch(actionCreator(id));
  } else {
    alert("Please Log In");
  }
  dispatch(actions.toggleFollowingInProgress(false, id));
}
export const follow = (id: number): ThunkType => async (dispatch) => {
  _followUnfollowFlow(dispatch, id, 'follow', actions.followSuccess);
}
export const unfollow = (id: number): ThunkType => async (dispatch) => {
  _followUnfollowFlow(dispatch, id, 'unFollow', actions.unfollowSuccess);

}

export default usersReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>


