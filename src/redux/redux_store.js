import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import authReducer from "./authReaducer";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";


let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form:formReducer,
  app:appReducer
});


/* =========================================================================================    */
/*                            for redux chrome extension                                        */
/**/      const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;      /**/
/**/ const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));   /**/
/* =========================================================================================    */

window.__store__ = store;

export default store;
