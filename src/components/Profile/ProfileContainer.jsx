import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { setUserProfile } from "../../redux/profileReducer";
import { withRouter } from "react-router";
import { usersAPI} from "../../api/api";

class ProfileContainer extends React.Component {
  componentDidMount = () => {
    let userId = this.props.match.params.userId;
    if (!userId) userId = 2;
    usersAPI.getOneUser(userId).then((data) => {
        this.props.setUserProfile(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <Profile {...this.props} />
      </div>
    );
  }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

let mapStateToProps = (state) => ({ profile: state.profilePage.profile });

export default connect(mapStateToProps, { setUserProfile })(
  WithUrlDataContainerComponent
);
