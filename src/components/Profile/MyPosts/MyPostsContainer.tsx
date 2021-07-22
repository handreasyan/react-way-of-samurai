import {actions} from "../../../redux/profileReducer";
import MyPosts, {DispatchPropsType, MapPropsType} from "./MyPosts";
import { connect } from "react-redux";
import {AppStateType} from "../../../redux/redux_store";


const MyPostsContainer = connect<MapPropsType,DispatchPropsType,{},AppStateType>((state:AppStateType) => {
  return {
    postsData: state.profilePage.postsData,
  };
}, {addPost: actions.addPostActionCreator })(MyPosts);


export default MyPostsContainer;
