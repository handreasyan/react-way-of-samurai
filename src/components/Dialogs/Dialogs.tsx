import styles from "./Dialogs.module.css";
import DialogItem from "./DIalogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ReturnField, Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validator";
import {DialogsInitialStateType} from "../../redux/dialogsReducer";


const Dialogs: React.FC<PropsType> = (props) => {

  const addNewMessage = (formData: NewMessageFormType) => {
    props.sendMessage(formData.newMessageBody)
  }
  const dialogsData = props.dialogsPage.dialogsData.map((dialog) => {
    return <DialogItem itemState={dialog} key={dialog.id}/>
  })
  const messagesData = props.dialogsPage.messagesData.map((message) => {
    return  <Message message={message.message} key={message.id}/>
  })
  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogs_items}>  {dialogsData} </div>
      <div className={styles.messages}>
        {messagesData}
        <AddMessageFormRedux onSubmit={addNewMessage}/>
      </div>
    </div>
  );
};

const maxLength50 = maxLengthCreator(50)


const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, {}>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {ReturnField<NewMessageFormValuesKeysType>('Enter new Message', Textarea, 'newMessageBody',
        [required, maxLength50], '', styles.textArea)}
      <button className={styles.textArea_but}> ADD</button>
    </form>
  )
}


const AddMessageFormRedux = reduxForm<NewMessageFormType>({form: 'dialogAddMessageForm'})(AddMessageForm);


export default Dialogs;

export type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>
type PropsType = {
  sendMessage: (newMessageBody: string) => void
  dialogsPage: DialogsInitialStateType
}
export type NewMessageFormType = {
  newMessageBody: string
}
