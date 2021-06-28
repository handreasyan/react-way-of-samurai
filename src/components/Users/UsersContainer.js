import { connect } from "react-redux";
import {follow,setUsers,unfollow,setCurrentPage,setTotalUserCount,setIsFetching,toggleFollowingInProgress,} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/loader";
import { getUsers } from "../../api/api";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.setIsFetching(true);

    getUsers(this.props.currentPage, this.props.pageSize).then((data) => {
      this.props.setIsFetching(false);
      this.props.setUsers(data.items);
      this.props.setTotalUserCount(data.totalCount);
    });

    this.props.setIsFetching(true);
  }
  onPageChanged = (pageNumber) => {
    this.props.setIsFetching(true);
    this.props.setCurrentPage(pageNumber);
    let n = 0;
    let times = setInterval(() => {
      n++;
      console.log(n);
    }, 1000);

    getUsers(pageNumber, this.props.pageSize)
      .then((data) => {
        this.props.setIsFetching(false);
        clearInterval(times);
        console.log("ok");
        this.props.setUsers(data.items);
      })
      .catch((error) => {
        clearInterval(times);
        console.log(error);
      });
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
          toggleFollowingInProgress={this.props.toggleFollowingInProgress}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUserCount,
  setIsFetching,
  toggleFollowingInProgress,
})(UsersContainer);
