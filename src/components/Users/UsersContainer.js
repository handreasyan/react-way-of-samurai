import { connect } from "react-redux";
import {
  follow,
  setUsers,
  unfollow,
  setCurrentPage,
  setTotalUserCount,
  setIsFetching,
  toggleFollowingInProgress,
} from "../../redux/usersReducer";
import * as axios from "axios";
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

{
  /* mdtp _ i mej tenumenq vor misht nuyn gorcoxutyunna arvum , aysinqn inqy veradarcnuma object vore uni methodner u dranq bolornel iranc mej kanchumen mer tvac actionCreatorin u iran poxancum injvor areq, bayc parzvuma vor connectin vorpes erkord arjeq mdtp i poxaren karanq poxancenq object actioncreator callbackaerov u inqy eti ira mej aftomat kpoxanci dispatchin u iran kta injvor arjeq ,, u gitrenq vor objecti mej ete key u value arjeqneri anunnere nuynnen karanq dnenq menak mi arjeq vore vor nuyne klini ham value hamar ham keyi => {name:name} === {name} ,, hetevabar karanq mer actioncreatorineri anunnernel darcnenq nenc vonc vor skzbum et anunov functionnereinq sarqel dispatchin kanchox , u vabshe henc skszbum inj vor ktnenq actionCreatori anune henc et anunnel kpoxancem mdtp i arjqe vorpes 

  let mapDispatchToProps = (dispatch) => {
    return {
      follow: (userId) => {
        dispatch(followAC(userId));
      },
      unfollow: (userId) => {
        dispatch(unfollowAC(userId));
      },
      setUsers: (user) => {
        dispatch(setUsersAC(user));
      },
      setCurrentPage: (currentPage) => {
        dispatch(setCurrentPageAC(currentPage));
      },
      setTotalUserCount: (totalCount) => {
        dispatch(setTotalUserCountAC(totalCount));
      },
      toggleIsFetching: (isFetching) => {
        dispatch(setIsFetchingAC(isFetching));
      },
    };
  };
   */
}

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUserCount,
  setIsFetching,
  toggleFollowingInProgress,
})(UsersContainer);
