import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getUserProfile} from "../../redux/profileReducer";
import { withRouter } from "react-router";
import {Redirect} from "react-router-dom";

class ProfileContainer extends React.Component {
  componentDidMount = () => {
    let userId = this.props.match.params.userId;
    if (!userId) userId = 2;
    this.props.getUserProfile(userId);
  };
  render() {

    if(!this.props.isAuth) return <Redirect to={'/login'} />

    return (
      <div>
        <Profile {...this.props} />
      </div>
    );
  }
}
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

let mapStateToProps = (state) => ({ profile: state.profilePage.profile ,isAuth: state.auth.isAuth});

export default connect(mapStateToProps, { getUserProfile })(
  WithUrlDataContainerComponent
);
