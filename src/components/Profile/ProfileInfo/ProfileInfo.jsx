import Preloader from "../../common/Preloader/loader";
import styles from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user_img.png";

function ProfileInfo({profile, updateUserStatus, status, isOwner}) {
  if (!profile) {
    return (
      <div>
        <Preloader/> Loading
      </div>
    );
  }
  return (
    <div className={styles.profileInfo}>
      <div className={styles.user_img_name_content}>
        <div>
          <img src={profile.photos.small || userPhoto} className={styles.user_img} alt="Profile_Photo" />
          {isOwner && <input type='file'/>}
        </div>
        <span className={styles.user_name}>{profile.fullName}</span>
      </div>

      <ProfileStatusWithHooks status={status}  lookingForAJobDescription={profile.lookingForAJobDescription}  updateUserStatus={updateUserStatus}/>

      <div className={styles.user_desc}>
        <b>STATUS:</b>
        {profile.aboutMe},
      </div>
    </div>
  );
}

export default ProfileInfo;
