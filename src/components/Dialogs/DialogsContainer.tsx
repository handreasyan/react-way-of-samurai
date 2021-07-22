import {actions } from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux_store";
import React from "react";


let mstp = (state:AppStateType) => ({ dialogsPage: state.dialogsPage});  //mapStateToProps


export default compose<React.ComponentType>(connect(mstp, {...actions}),WithAuthRedirect)(Dialogs);
