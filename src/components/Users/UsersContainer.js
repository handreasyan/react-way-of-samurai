import {connect} from "react-redux";
import {follow, requestUsers, setCurrentPage, toggleFollowingInProgress, unfollow,} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/loader";
import { getCurrentPageSel,getFollowingInProgressSel,getIsFetchingSel,
  getPageSizeSel, getTotalUsersCountSel, getUsersSel} from "../../redux/users-selectors";

class UsersContainer extends React.Component {

  componentDidMount() {
    const {getUsers,currentPage,pageSize} = this.props
    getUsers(currentPage,pageSize)
  }

  onPageChanged = (pageNumber) => {
    const {getUsers,pageSize} = this.props
    getUsers(pageNumber, pageSize)
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader/> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          users={this.props.users}
          currentPage={this.props.currentPage}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          onPageChanged={this.onPageChanged}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mstp = (state) => {  // mapStateToProps
  return {
    users: getUsersSel(state),
    pageSize: getPageSizeSel(state),
    totalUsersCount: getTotalUsersCountSel(state),
    currentPage: getCurrentPageSel(state),
    isFetching: getIsFetchingSel(state),
    followingInProgress: getFollowingInProgressSel(state),
  };
};


let mdtp = {follow, unfollow, setCurrentPage, toggleFollowingInProgress, getUsers: requestUsers}; // mapDIspatchToProps

export default connect(mstp, mdtp)(UsersContainer)
