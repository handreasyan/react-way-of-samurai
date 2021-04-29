import { NavLink } from "react-router-dom";
import styles from "./DialogItem.module.css";
const DialogItem = ({ itemState }) => {
  return (
    <div className={styles.dialog}>
      <img src={itemState.src} alt="User" />
      <NavLink to={"/dialogs/" + itemState.id}>{itemState.name}</NavLink>
    </div>
  );
};

export default DialogItem;
