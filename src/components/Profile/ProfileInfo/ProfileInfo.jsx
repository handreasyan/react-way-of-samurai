import Preloader from "../../common/Preloader/loader";
import styles from "./ProfileInfo.module.css";

function ProfileInfo(props) {
  if (!props.profile) {
    return (
      <div>
        <Preloader /> Loading
      </div>
    );
  }
  return (
    <div>
      <div className={styles.header_img_container}>
        <img
          src={
            "https://i.pinimg.com/originals/56/3a/db/563adbeb015fb165c4145a28a6c2e4c8.jpg"
          }
          className={styles.header_img}
          alt="Profile"
        />
      </div>
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
    </div>
  );
}

export default ProfileInfo;

//lesson 60
