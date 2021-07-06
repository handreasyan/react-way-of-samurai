import React, {useEffect, useState} from 'react';
import styles from "./ProfileInfo.module.css";

const ProfileStatusWithHooks = (props) => {
  const [editMode,setEditMode] = useState(false);
  const [status,setStatus] = useState(props.status);

  const onStatusChange = event => setStatus(event.currentTarget.value);
  const activateEditMode = () => setEditMode(true);
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status)
  }

  useEffect(()=>{
      setStatus(props.status)
  },[props.status])

  return (
      <div className={styles.defStatusContent}>
        <h1>Default Status Content</h1><br/>
        <div>
          {
            !editMode && <span onDoubleClick={activateEditMode}>{props.status || 'Not Have a Status !'}</span>
          }
          {
            editMode &&
            <input type="text" value={status} onBlur={deactivateEditMode} onChange={onStatusChange} autoFocus={true}/>
          }
        </div>
      </div>
    );
}


export default ProfileStatusWithHooks;