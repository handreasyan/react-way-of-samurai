import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { setUserProfile } from "../../redux/profileReducer";

class ProfileContainer extends React.Component {
  componentDidMount = () => {
    let n = 0;
    let times = setInterval(() => {
      n++;
      console.log(n);
    }, 1000);
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then((response) => {
        clearInterval(times);
        this.props.setUserProfile(response.data);
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
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({ profile: state.profilePage.profile });

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);
