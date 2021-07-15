import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

function Profile(props) {
  return (
    <div>
      <ProfileInfo saveProfile={props.saveProfile} savePhoto={props.savePhoto} isOwner={!props.match.params.userId} profile={props.profile} updateUserStatus={props.updateUserStatus} status={props.status}/>
      <MyPostsContainer />
    </div>
  );
}

export default Profile;
