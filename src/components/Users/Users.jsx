import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user_img.png";
import { NavLink } from "react-router-dom";
import * as axios from "axios";
let Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  // vor ejis vra shat spaner chereva minjev klucenq sra xnidre
  const spans = pages.map((p) => {
    return (
      <span
        key={p}
        className={
          styles.paginationSpan +
          " " +
          (props.currentPage === p && styles.selectedPage)
        }
        onClick={() => props.onPageChanged(p)}
      >
        {p}
      </span>
    );
  });
  const spansShowFunc = () => {
    let newArr = [];
    if (spans.length > 10) {
      for (let i = 10; i < 110; i++) {
        newArr.push(spans[i]);
      }
    }
    return newArr;
  };
  //---------

  return (
    <div>
      <div>{spansShowFunc()}</div>
      {props.users.map((user) => {
        return (
          <div key={user.id} className={styles.user_block}>
            <div className={styles.user_img_cont}>
              <div>
                <NavLink to={"/profile/" + user.id}>
                  <img
                    alt="Polzovatel"
                    src={user.photos.small ? user.photos.small : userPhoto}
                    className={styles.photo}
                  />
                </NavLink>
              </div>
              {user.followed ? (
                <button
                  disabled={props.followingInProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => {
                    props.toggleFollowingInProgress(true, user.id);
                    axios
                      .delete(
                        `https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                        {
                          withCredentials: true,
                          headers: {
                            "API-KEY": "2d125ff6-566c-49e6-b2b5-ccdcd757752f",
                          },
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.unfollow(user.id);
                        } else {
                          alert("Please Log In");
                        }
                        props.toggleFollowingInProgress(false, user.id);
                      });
                  }}
                  className={styles.user_btn}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => {
                    props.toggleFollowingInProgress(true, user.id);
                    axios
                      .post(
                        `https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                        {},
                        {
                          withCredentials: true,
                          headers: {
                            "API-KEY": "2d125ff6-566c-49e6-b2b5-ccdcd757752f",
                          },
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.follow(user.id);
                        } else {
                          alert("Please Log In");
                        }

                        props.toggleFollowingInProgress(false, user.id);
                      });
                  }}
                  className={styles.user_btn}
                >
                  Follow
                </button>
              )}
            </div>
            <div className={styles.user_desc}>
              <div>
                <div>{user.name}</div>
                <div>{user.status}</div>
              </div>
              <div>
                <div>user.location.country</div>
                <div>user.location.city</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
