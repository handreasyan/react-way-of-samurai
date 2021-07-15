import styles from "./Post.module.css";

const Post = ({ message, src, likes }) => {
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
