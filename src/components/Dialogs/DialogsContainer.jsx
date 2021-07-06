import {addNewMessageActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

let mstp = (state) => ({ dialogsPage: state.dialogsPage});  //mapStateToProps
let mdtp = (dispatch) => { //mapDispatchToProps
  return {
    addMessage: (newMessageBody) => dispatch(addNewMessageActionCreator(newMessageBody)),
  };
};


export default compose(connect(mstp, mdtp),WithAuthRedirect)(Dialogs);
