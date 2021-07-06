import Preloader from "../../common/Preloader/loader";
import styles from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

function ProfileInfo(props) {
  if (!props.profile) {
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
          src={props.profile.photos.small}
          className={styles.user_img}
          alt="Profile_Photo"
        />
        <span className={styles.user_name}>{props.profile.fullName}</span>
        <div className={styles.user_desc}>
          <b>STATUS:</b>
          {props.profile.aboutMe},
          <div>
            <b>Looking For Job: </b>
            {props.profile.lookingForAJobDescription}
          </div>
        </div>
      </div>
      <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
    </div>
  );
}

export default ProfileInfo;
