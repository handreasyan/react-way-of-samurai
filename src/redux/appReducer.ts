import {getAuthUserData} from "./authReaducer";
import { InferActionsTypes} from "./redux_store";

let initialState = { initialized:false };

export type InitialStateType = typeof  initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action:ActionsTypes):InitialStateType => {
  switch (action.type) {
    case "SN/APP/INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized:true,
      };
    default:
      return state;
  }
};

export const actions = {
  initializedSuccess:()=> ({type: "SN/APP/INITIALIZED_SUCCESS"}  as const)
}

export const initializeApp = () => (dispatch:any) => {
  let promise = dispatch(getAuthUserData());
  // let somethingelse = dispatch(somethingelsefunc())
  // let somethingelse2 = dispatch(somethingelsefunc2())
    // promise all _ em ogtagorcel , vorovhetev karam unenam naev ayl dispatcher voronc katarveluc heto nor karam entadrem vor initializedSuccess ))
  Promise.all([promise]).then(()=>{
    dispatch(actions.initializedSuccess());
  });
}

export default appReducer;
