import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validator";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10)

const MyPosts = React.memo(props => {
  let postElement = props.postsData
    .map((post) => <Post message={post.post} src={post.src} likes={post.likesCount} key={post.id}/>);

  const onAddPost = (formData) => props.addPost(formData.newPostText)

  return (
    <div className={styles.myPosts}>
      <h2>My Posts</h2>
      <div>
        <AddNewPostForm onSubmit={onAddPost}/>
      </div>
      <div className={styles.posts}>{postElement}</div>
    </div>
  );
});

let AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
          <Field component={Textarea} name={'newPostText'} validate={[required,maxLength10]} placeholder='Post Message'/>
      </div>
      <button>Add Post</button>
    </form>
  )
}

AddNewPostForm = reduxForm({form:'ProfileAddNewPostForm'})(AddNewPostForm);

export default MyPosts;
