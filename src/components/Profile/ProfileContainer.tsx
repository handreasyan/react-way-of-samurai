import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux_store";
import {ProfileType} from "../../types/types";

type MapPropsType = {
  profile:  ProfileType,
  status: string,
  authorizedUserId:number,
  isAuth:boolean
}
type DispatchPropsType = {
  saveProfile:(profile:ProfileType) => Promise<void>
  getUserProfile:(userId:number)=>void,
  getUserStatus:(userId:number)=>void,
  updateUserStatus:(str:string)=> void,
  savePhoto:(file:File)=> void,
}
type PathParamsType = { userId:string }
type ProfileContainerPropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
  refreshProfile = () => {
    let userId:number | null = +this.props.match.params.userId;

    if (!userId){
      userId = this.props.authorizedUserId
      if(!userId) this.props.history.push('/login')
    }

    this.props.getUserProfile(userId as number);
    this.props.getUserStatus(userId as number);
  }
  componentDidMount = () => {
   this.refreshProfile()
  };

  componentDidUpdate(prevProps:ProfileContainerPropsType) {
    if(this.props.match.params.userId !== prevProps.match.params.userId){
      this.refreshProfile()
    }
  }

  render() {
    return (
      <div>
        <Profile {...this.props} />
      </div>
    );
  }
}

let mstp = (state:AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId:state.auth.userId,
    isAuth:state.auth.isAuth
  }
}; // mapStateToProps

export default compose<React.ComponentType>(connect(mstp, {saveProfile, getUserProfile,getUserStatus,updateUserStatus ,savePhoto}),withRouter)(ProfileContainer)
