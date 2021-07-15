import {connect} from "react-redux";
import {follow, requestUsers, unfollow,} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/loader";
import { getCurrentPageSel,getFollowingInProgressSel,getIsFetchingSel,
  getPageSizeSel, getTotalUsersCountSel, getUsersSel} from "../../redux/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux_store";

// next lesson N10 __ https://youtu.be/FK_FSOCC3ss?list=PLcvhF2Wqh7DM3z1XqMw0kPuxpbyMo3HvN

type MapStatePropsTypes = {
  pageSize: number,
  currentPage: number,
  isFetching: boolean,
  totalUsersCount: number,
  users:Array<UserType>,
  followingInProgress:Array<number>,
}

type MapDispatchPropsTypes = {
  unfollow:(id:number) => void,
  follow:(id:number) => void,
  getUsers:(currentPage:number,pageSize:number) => void,
}

type OwnPropsTypes = {
  // componentin poxancvac propsneri hamar
}

type PropsTypes = MapStatePropsTypes & MapDispatchPropsTypes & OwnPropsTypes;

class UsersContainer extends React.Component<PropsTypes> {
  componentDidMount() {
    const {getUsers,currentPage,pageSize} = this.props
    getUsers(currentPage,pageSize)
  }

  onPageChanged = (pageNumber:number) => {
    const {getUsers,pageSize} = this.props
    getUsers(pageNumber, pageSize)
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader/> : null}
        <Users {...this.props} onPageChanged={this.onPageChanged} />
      </>
    );
  }
}

let mstp = (state:AppStateType):MapStatePropsTypes => {  // mapStateToProps
  return {
    users: getUsersSel(state),
    pageSize: getPageSizeSel(state),
    totalUsersCount: getTotalUsersCountSel(state),
    currentPage: getCurrentPageSel(state),
    isFetching: getIsFetchingSel(state),
    followingInProgress: getFollowingInProgressSel(state),
  }
}


let mdtp = {follow, unfollow, getUsers: requestUsers}; // mapDIspatchToProps

export default connect<MapStatePropsTypes,MapDispatchPropsTypes,OwnPropsTypes,AppStateType>(mstp, mdtp)(UsersContainer)
