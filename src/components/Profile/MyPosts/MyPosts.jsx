import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  let postElement = props.postsData.map((post) => (
    <Post
      message={post.post}
      src={post.src}
      likes={post.likesCount}
      key={post.id}
    />
  ));
  const newPostElement = React.createRef();
  const onAddPost = () => {
    props.addPost();
  };
  const onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  };
  return (
    <div>
      <h2>My Posts</h2>
      <div>
        <div>
          <textarea
            ref={newPostElement}
            value={props.newPostText}
            onChange={onPostChange}
          />
        </div>
        <button onClick={onAddPost}>Add Post</button>
      </div>
      <div className={styles.posts}>{postElement}</div>
    </div>
  );
};

export default MyPosts;
