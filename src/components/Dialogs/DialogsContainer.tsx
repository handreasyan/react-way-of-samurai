import {addNewMessageActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux_store";

type ACType = {
  type: string,
  newMessageBody:string
}


let mstp = (state:AppStateType) => ({ dialogsPage: state.dialogsPage});  //mapStateToProps
let mdtp = (dispatch:(fn:ACType)=>void) => { //mapDispatchToProps
  return {
    addMessage: (newMessageBody:string) => dispatch(addNewMessageActionCreator(newMessageBody)),
  };
};


export default compose(connect(mstp, mdtp),WithAuthRedirect)(Dialogs);
