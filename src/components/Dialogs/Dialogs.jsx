import styles from "./Dialogs.module.css";
import DialogItem from "./DIalogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import {Field,reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validator";

const Dialogs = (props) => {

  const addNewMessage = (formData) => {
    props.addMessage(formData.newMessageBody)
  }
  const dialogsData  = props.dialogsPage.dialogsData.map((dialog) => <DialogItem itemState={dialog} key={dialog.id} />)
  const messagesData = props.dialogsPage.messagesData.map((message) => <Message message={message.message} key={message.id} />)
  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogs_items}>  { dialogsData } </div>
      <div className={styles.messages}>
        { messagesData }
        <AddMessageFormRedux onSubmit={addNewMessage}/>
      </div>
    </div>
  );
};

const maxLength50 = maxLengthCreator(50)

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={Textarea} name='newMessageBody' placeholder="Enter new Message" className={styles.textArea}
          validate={[required,maxLength50]}/>
      <button className={styles.textArea_but}> ADD </button>
    </form>
  )
}


const AddMessageFormRedux = reduxForm({form:'dialogAddMessageForm'})(AddMessageForm);

export default Dialogs;
