import styles from "./Dialogs.module.css";
import DialogItem from "./DIalogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import {Redirect} from "react-router-dom"
const Dialogs = (props) => {

   if(!props.isAuth) return <Redirect to={'/login'} />

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogs_items}>
        {props.dialogsPage.dialogsData.map((dialog) => (
          <DialogItem itemState={dialog} key={dialog.id} />
        ))}
      </div>
      <div className={styles.messages}>
        {props.dialogsPage.messagesData.map((message) => (
          <Message message={message.message} key={message.id} />
        ))}
        <textarea
          placeholder="Enter new Message"
          className={styles.textArea}
          value={props.dialogsPage.newMessageText}
          onChange={(e) => props.enterNewMessage(e.target.value)}
        />
        <button className={styles.textArea_but} onClick={props.addMessage}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default Dialogs;
