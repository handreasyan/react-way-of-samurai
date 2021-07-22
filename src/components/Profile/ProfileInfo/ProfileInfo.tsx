import Preloader from "../../common/Preloader/loader";
import styles from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./profileData/ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user_img.png";
import React, {ChangeEvent, useState} from "react";
import ProfileData from "./profileData/ProfileInfoData";
import ProfileDataReduxForm from "./profileData/ProfileDataForm";
import {ProfileType} from "../../../types/types";

type PropsType = {
  profile:ProfileType,
  updateUserStatus:(st:string)=> void,
  status:string,
  isOwner:boolean,
  savePhoto:(file:File)=> void,
  saveProfile:(fd:ProfileType) => Promise<void>
}

const ProfileInfo:React.FC<PropsType> = ({profile, updateUserStatus, status, isOwner, savePhoto,saveProfile}) => {

  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return (
      <div>
        <Preloader/> Loading
      </div>
    );
  }
  const onPhotoSelected = (event:ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      savePhoto(event.target.files[0])
    }
  }
  const onSubmit = (formData:ProfileType) => {
    saveProfile(formData).then(()=>{
      setEditMode(false)
    })
  }
  return (
    <div className={styles.profileInfo}>
      <div className={styles.user_img_name_content}>
        <div>
          <img src={profile.photos ? profile.photos.large || userPhoto : userPhoto} className={styles.user_img}
               alt="Profile_Photo"/>
          {isOwner && <input type='file' onChange={onPhotoSelected}/>}
        </div>
        <span className={styles.user_name}>{profile.fullName}</span>
      </div>

      <div className={styles.defStatusContent}>
          <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
        <br/>
        {!editMode && <div><button onClick={()=>setEditMode(true)}>Edit</button></div>}
        {
          editMode
            ? <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
            : <ProfileData profile={profile}/>
        }
      </div>

    </div>
  );
}

export default ProfileInfo;
