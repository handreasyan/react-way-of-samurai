import Preloader from "../../common/Preloader/loader";
import styles from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

function ProfileInfo({profile,updateUserStatus,status}) {
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
        <img
          src={profile.photos.small}
          className={styles.user_img}
          alt="Profile_Photo"
        />
        <span className={styles.user_name}>{profile.fullName}</span>
        <div className={styles.user_desc}>
          <b>STATUS:</b>
          {profile.aboutMe},
          <div>
            <b>Looking For Job: </b>
            {profile.lookingForAJobDescription}
          </div>
        </div>
      </div>
      <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
    </div>
  );
}

export default ProfileInfo;
