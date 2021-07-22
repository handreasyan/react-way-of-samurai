import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import authReducer from "./authReaducer";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";


let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form:formReducer,
  app:appReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export type BaseThunkType<AT extends Action,R = Promise<void>> = ThunkAction<R, AppStateType, unknown, AT>
export type InferActionsTypes<T> = T extends {[key:string]:(...args:any) => infer U } ? U : never


/* =========================================================================================    */
/*                            for redux chrome extension                                        */
/**/      // @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;      /**/
/**/ const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));   /**/
/* =========================================================================================    */

// @ts-ignore
window.__store__ = store;

export default store;
