// sa el chi ogtagorcvum,, unem redux_store fayl eniaiskakane,,, isk zut tox mna ))

import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";

const store = {
  _state: {
    profilePage: {
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
      newPostText: "IT-Kamasutra.com",
    },
    dialogsPage: {
      dialogsData: [
        {
          id: 1,
          name: "John",
          src:
            "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png",
        },
        {
          id: 2,
          name: "Tony",
          src:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png",
        },
        {
          id: 3,
          name: "Anna",
          src:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png",
        },
        {
          id: 4,
          name: "Angel",
          src:
            "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
        },
        {
          id: 5,
          name: "Mike",
          src: "https://cdn1.flamp.ru/cbdfd4792aaddd457030e8f03b7b7b63.png",
        },
      ],

      messagesData: [
        { id: 1, message: "Hello , How are you ?" },
        { id: 2, message: "Where are you ?" },
        { id: 3, message: "Do you love me ?" },
        { id: 4, message: "Hello ,Where are you ?" },
      ],
      newMessageText: "",
    },
    sidebar: {},
  },
  _callSubscirber() {
    console.log("State Rerender");
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscirber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscirber(this._state);
  },
};

window.store = store;
export default store;
