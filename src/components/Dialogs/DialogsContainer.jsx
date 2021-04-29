import {
  addNewMessageActionCreator,
  enterNewMessageActionCreator,
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";

let mapStateToProps = (state) => ({ dialogsPage: state.dialogsPage });
let mapDispatchToProps = (dispatch) => {
  return {
    addMessage: () => dispatch(addNewMessageActionCreator()),
    enterNewMessage: (text) => dispatch(enterNewMessageActionCreator(text)),
  };
};
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
