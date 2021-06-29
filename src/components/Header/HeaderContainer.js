import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { setAuthUserData, setCurrentUser } from "../../redux/authReaducer";
import {usersAPI} from "../../api/api";

class HeaderContainer extends React.Component {
  componentDidMount() {
    usersAPI.getMyProfile().then((data) => {
        if (data.resultCode === 0) {
          let { login, id, email } = data.data;
          this.props.setAuthUserData(id, email, login);

          usersAPI.getOneUser(id).then((data) => {
              this.props.setCurrentUser(login, data.photos.small);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
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

export default connect(mapStateToProps, { setAuthUserData, setCurrentUser })(
  HeaderContainer
);
