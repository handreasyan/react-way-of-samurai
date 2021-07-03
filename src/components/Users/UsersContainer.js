import { connect } from "react-redux";
import { follow, unfollow, setCurrentPage,toggleFollowingInProgress,
                             getUsers,} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/loader";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage,this.props.pageSize)
  }
  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber,this.props.pageSize)
  };
  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
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
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};
let mdtp = {follow,unfollow,setCurrentPage,toggleFollowingInProgress,getUsers}; // mapDIspatchToProps

export default compose(WithAuthRedirect,connect(mstp,mdtp))(UsersContainer)
