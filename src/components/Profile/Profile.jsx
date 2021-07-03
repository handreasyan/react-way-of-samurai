import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

function Profile(props) {
  return (
    <div>
      <ProfileInfo profile={props.profile} updateUserStatus={props.updateUserStatus} status={props.status}/>
      <MyPostsContainer />
    </div>
  );
}

export default Profile;
