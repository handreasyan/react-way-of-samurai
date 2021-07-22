import React, {ChangeEvent, useEffect, useState} from 'react';

interface IProps {
  status:string,
  updateUserStatus:(status:string) => void
}

const ProfileStatusWithHooks:React.FC<IProps> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  const onStatusChange = (event:ChangeEvent<HTMLInputElement>) => setStatus(event.currentTarget.value);
  const activateEditMode = () => setEditMode(true);
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status)
  }

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  return (
      <div>
        <b>STATUS : </b>
        {
          !editMode && <span onDoubleClick={activateEditMode}>{props.status || 'Not Have a Status !'}</span>
        }
        {
          editMode &&
          <input type="text" value={status} onBlur={deactivateEditMode} onChange={onStatusChange} autoFocus={true}/>
        }
      </div>
  );
}

export default ProfileStatusWithHooks;