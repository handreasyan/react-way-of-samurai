import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

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
  ],
  newPostText: "Enter New Post Here",
  profile: null,
  status:''
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: Math.floor(Math.random() * 1000),
        post: state.newPostText,
        likesCount: 0,
        src:
          "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
      };
      return {
        ...state,
        postsData: [...state.postsData, newPost],
        newPostText: "",
      };

    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.text,
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
    default:
      return state;
  }
};
export default profileReducer;

export const addPostActionCreator = () => ({ type: ADD_POST });
export const setStatus = (status) => ({ type: SET_STATUS ,status});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const getUserProfile = (userId) => (dispatch) => {
  usersAPI.getOneUser(userId).then((data) => {
    dispatch(setUserProfile(data));
  })
}
export const getUserStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId).then((data) => {
    dispatch(setStatus(data));
  })
}
export const updateUserStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status).then((data) => {
    if(data.resultCode === 0) {
      dispatch(setStatus(status));
    } else {
      console.warn('Some Error')
    }
  })
}
export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  text: text,
});
