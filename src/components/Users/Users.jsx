import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user_img.png";
import { NavLink } from "react-router-dom";
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
                  onClick={() => props.unfollow(user.id)}
                  className={styles.user_btn}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => props.follow(user.id)}
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
