import React from "react";
import Header from "./Header";
import * as axios from "axios";
import { connect } from "react-redux";
import { setAuthUserData, setCurrentUser } from "../../redux/authReaducer";

class HeaderContainer extends React.Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.resultCode === 0) {
          let { login, id, email } = response.data.data;
          this.props.setAuthUserData(id, email, login);

          axios
            .get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
            .then((response) => {
              this.props.setCurrentUser(login, response.data.photos.small);
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
