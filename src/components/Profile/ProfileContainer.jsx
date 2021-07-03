import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/profileReducer";
import { withRouter } from "react-router";
import {compose} from "redux";

class ProfileContainer extends React.Component {
  componentDidMount = () => {
    let userId = this.props.match.params.userId;
    if (!userId) userId = 16792;
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  };
  render() {

    return (
      <div>
        <Profile {...this.props} />
      </div>
    );
  }
}
let mstp = (state) => ({ profile: state.profilePage.profile,status: state.profilePage.status}); // mapStateToProps

export default compose(connect(mstp, { getUserProfile,getUserStatus,updateUserStatus }),withRouter)(ProfileContainer)
