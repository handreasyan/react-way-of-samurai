import {authAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login,isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login ,isAuth},
});
export const getAuthUserData = () => (dispatch) =>{
  authAPI.me().then((data) => {
    if (data.resultCode === 0) {
      let { login, id, email} = data.data;
      dispatch(setAuthUserData(id, email, login,true));
    }
  });
}


export const login = (email,password,rememberMe) => (dispatch) =>{
  authAPI.login(email,password,rememberMe).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData());
    }
  });
}
export const logout = () => (dispatch) =>{
  authAPI.logout().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null,null,null,false));
    }
  });
}


export default authReducer;
