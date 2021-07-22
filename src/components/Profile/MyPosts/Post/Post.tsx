import styles from "./Post.module.css";
import React from "react";

interface IProps{
  message:string,
  src:string,
  likes:number
}


const Post:React.FC<IProps> = ({ message, src, likes }) => {
  return (
    <div className={styles.item}>
      <img src={src} alt="User" />
      {message}
      <span className={styles.likes_count}>Likes Count: {likes}</span>
      <button>Like</button>
    </div>
  );
};

export default Post;
