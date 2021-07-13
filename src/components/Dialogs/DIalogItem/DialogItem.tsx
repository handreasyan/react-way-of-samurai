import { NavLink } from "react-router-dom";
import styles from "./DialogItem.module.css";
import React from "react";

type PropsType = {
  itemState:{
    src:string,
    id:number,
    name:string
  }
}

const DialogItem:React.FunctionComponent<PropsType> = ({ itemState }:PropsType) => {
  return (
    <div className={styles.dialog}>
      <img src={itemState.src} alt="User" />
      <NavLink to={"/dialogs/" + itemState.id}>{itemState.name}</NavLink>
    </div>
  );
};

export default DialogItem;
