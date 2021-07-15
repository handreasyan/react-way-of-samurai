import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout} from "../../redux/authReaducer";
import {AppStateType} from "../../redux/redux_store";

class HeaderContainer extends React.Component {

  render() {
    // @ts-ignore            /'// es sxalnery uje chgitem te injica
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state:AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  userPhoto:state.profilePage.profile?.photos.large
});
export default connect(mapStateToProps, { logout })(HeaderContainer);
