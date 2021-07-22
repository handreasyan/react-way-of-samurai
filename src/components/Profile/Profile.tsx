import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import React from "react";
import {ProfileType} from "../../types/types";

interface IProps {
  saveProfile: (fd:ProfileType) => Promise<void>,
  savePhoto: (file:File)=> void,
  isAuth: boolean,
  profile: ProfileType ,
  updateUserStatus: (st:string)=> void,
  status: string,
}

const Profile:React.FC<IProps> = (props) => {
  return (
    <div>
      <ProfileInfo saveProfile={props.saveProfile} savePhoto={props.savePhoto} isOwner={!props.isAuth}
                   profile={props.profile} updateUserStatus={props.updateUserStatus} status={props.status}/>
      <MyPostsContainer />
    </div>
  );
}

export default Profile;
