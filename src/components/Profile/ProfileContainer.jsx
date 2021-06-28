import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { setUserProfile } from "../../redux/profileReducer";
import { withRouter } from "react-router";
import {getOneUser} from "../../api/api";

class ProfileContainer extends React.Component {
  componentDidMount = () => {
    let n = 0;
    let times = setInterval(() => {
      n++;
      console.log(n);
    }, 1000);
    let userId = this.props.match.params.userId;
    if (!userId) userId = 2;
    getOneUser(userId).then((data) => {
        clearInterval(times);
        this.props.setUserProfile(data);
        console.log("ok");
      })
      .catch((error) => {
        clearInterval(times);
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
