import {InferActionsTypes} from "./redux_store";

type DialogType =  {
  id:number,
  name:string,
  src:string
}
type MessageType =  {
  id:number,
  message:string,
}

let initialState = {
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
  ] as Array<DialogType>,
  messagesData: [
    { id: 1, message: "Hello , How are you ?" },
    { id: 2, message: "Where are you ?" },
    { id: 3, message: "Do you love me ?" },
    { id: 4, message: "Hello ,Where are you ?" },
  ] as Array<MessageType>
};

export const actions = {
  sendMessage:(newMessageBody:string) => ({type: "ADD-NEW-MESSAGE",newMessageBody} as const )
}

const dialogsReducer = (state:DialogsInitialStateType = initialState, action:ActionsType):DialogsInitialStateType => {
  switch (action.type) {
    case "ADD-NEW-MESSAGE":
      let text = action.newMessageBody;
      let newId = Math.floor(Math.random() * 1000);
      return {
        ...state,
        messagesData: [...state.messagesData, { id: newId, message: text }],
      };

    default:
      return state;
  }
};

export default dialogsReducer;

export type DialogsInitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
