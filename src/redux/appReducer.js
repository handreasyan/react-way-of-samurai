import {getAuthUserData} from "./authReaducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
  initialized:false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized:true
      };
    default:
      return state;
  }
};

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  // let somethingelse = dispatch(somethingelsefunc())
  // let somethingelse2 = dispatch(somethingelsefunc2())
    // promise all _ em ogtagorcel , vorovhetev karam unenam naev ayl dispatcher voronc katarveluc heto nor karam entadrem vor initializedSuccess ))
  Promise.all([promise]).then(()=>{
    dispatch(initializedSuccess());
  });
}

export default appReducer;
