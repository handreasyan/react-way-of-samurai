import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout} from "../../redux/authReaducer";
import {AppStateType} from "../../redux/redux_store";


const HeaderContainer:React.FC<mstpType & dtype> = (props) => {
    return <Header {...props}  />;
}

const mapStateToProps = (state:AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  userPhoto:state.profilePage.profile?.photos.large
} as mstpType);

export type mstpType = {
  isAuth: boolean,
  login: string | null,
  userPhoto: undefined | string
}
export type dtype = {logout:()=> void}

export default connect<mstpType,dtype, {},AppStateType>(mapStateToProps, { logout })(HeaderContainer);
