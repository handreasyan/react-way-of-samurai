import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import {getAuthUserData, setCurrentUser} from "../../redux/authReaducer";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.getAuthUserData()
  }
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  userName: state.auth.currentUser.userName,
  userPhoto: state.auth.currentUser.userPhoto,
});

export default connect(mapStateToProps, { getAuthUserData, setCurrentUser })(
  HeaderContainer
);
