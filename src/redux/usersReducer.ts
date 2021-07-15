import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objects-helpers";
import {UserType} from "../types/types";
import {AppStateType, InferActionsTypes} from "./redux_store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";


let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of users id
};

type InitialStateType = typeof initialState;


const usersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
      };
    case 'UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
      };
    case 'SET_USERS':
      return { ...state, users: action.users };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.currentPage };
    case 'SET_TOTAL_USERS_COUNT':
      return { ...state, totalUsersCount: action.totalCount };
    case 'TOGGLE_IS_FETCHING':
      return { ...state, isFetching: action.isFetching };
    case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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

export default usersReducer;

export const actions = {
  followSuccess(userId: number) {
    return { type: 'FOLLOW', userId } as const
  },
  unfollowSuccess: (userId: number) => {
    return { type: 'UNFOLLOW', userId } as const
  },
  setUsers: (users: Array<UserType>) => {
    return { type: 'SET_USERS', users } as const
  },
  setTotalUserCount: (totalCount: number) => {
    return { type: 'SET_TOTAL_USERS_COUNT', totalCount } as const
  },
  setCurrentPage: (currentPage: number) => {
    return { type: 'SET_CURRENT_PAGE', currentPage } as const
  },
  toggleIsFetching: (isFetching: boolean) => {
    return { type: 'TOGGLE_IS_FETCHING', isFetching } as const
  },
  toggleFollowingInProgress: (isFetching: boolean, userId: number) => {
    return { type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const
  },
}


type ActionsTypes = InferActionsTypes<typeof actions>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

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

type DispatchType = Dispatch<ActionsTypes>

const _followUnfollowFlow = async (dispatch: DispatchType, id: number, apiMethod: string, actionCreator: (id: number) => ActionsTypes) => {
  dispatch(actions.toggleFollowingInProgress(true, id));

  // @ts-ignore       =================================================================
  const response = await usersAPI[apiMethod].call(usersAPI, id);
  if (response.data.resultCode === 0) {
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



