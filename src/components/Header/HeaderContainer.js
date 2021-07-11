import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout} from "../../redux/authReaducer";

class HeaderContainer extends React.Component {

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  userPhoto:state.profilePage.profile?.photos.large
});
export default connect(mapStateToProps, { logout })(HeaderContainer);
