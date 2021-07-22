import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import {InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../../utils/validators/validator";
import {getStringKeys, ReturnField, Textarea} from "../../common/FormsControls/FormsControls";
import {PostType} from "../../../types/types";

export type MapPropsType = {
  postsData: PostType[];
}
export type DispatchPropsType = {
  addPost: (text: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  type PostType = {
    id: number,
    post: string,
    src: string,
    likesCount: number,
  }
  let postElement = props.postsData
    .map((post: PostType) => <Post message={post.post} src={post.src} likes={post.likesCount} key={post.id}/>);

  const onAddPost = (formData: AddPostFormValuesType) => props.addPost(formData.newPostText)

  return (
    <div className={styles.myPosts}>
      <h2>My Posts</h2>
      <div>
        <AddNewPostReduxForm onSubmit={onAddPost}/>
      </div>
      <div className={styles.posts}>{postElement}</div>
    </div>
  );
}


type AddPostFormValuesType = {
  newPostText: string
}
type AddPostValKeys = getStringKeys<AddPostFormValuesType>

let AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {ReturnField<AddPostValKeys>('Post Message', Textarea, 'newPostText', [required])}
      </div>
      <button>Add Post</button>
    </form>
  )
}

const AddNewPostReduxForm = reduxForm<AddPostFormValuesType, {}>({form: 'ProfileAddNewPostForm'})(AddPostForm);

export default React.memo(MyPosts);
