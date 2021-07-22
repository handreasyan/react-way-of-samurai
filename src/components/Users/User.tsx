import React from 'react';
import styles from "./Users.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user_img.png";
import {UserType} from "../../types/types";

type PropsType = {
  user:UserType,
  followingInProgress:Array<number>,
  unfollow:(id:number)=> void,
  follow:(id:number)=> void,
}

export const User:React.FC<PropsType> = ({user,followingInProgress,unfollow,follow}) => {

  const renderButton = (text:string,func:(id:number)=> void,user:UserType,followingInProgress:Array<number>) => {
    return (
      <button
        disabled={followingInProgress.some(
          (id:number) => id === user.id
        )}
        onClick={() => func(user.id)}
        className={styles.user_btn}
      >
        {text}
      </button>
    )
  }
  const unfollowButton = renderButton('Unfollow',unfollow,user,followingInProgress);
  const followButton =  renderButton('Follow',follow,user,followingInProgress);

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
        { user.followed ? unfollowButton : followButton }
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
};

export default User;