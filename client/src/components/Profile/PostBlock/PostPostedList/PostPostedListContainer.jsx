/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { POSTS } from "../../../../store/reducers/fetchingReducer";
import { getAllMyPosts, ratePostThunk, deletePostThunk } from '../../../../store/reducers/usersPostsReducer';

import Preloader from '../../../sharedComponents/Preloader/Preloader';
import PostPostedList from "./PostPostedList";

function PostPostedListAPI(props) {
  const { getAllMyPosts, ...restProps } = props;
  useEffect(() => { getAllMyPosts() }, [getAllMyPosts])
  return (
    props.isFetching ?
      <Preloader /> :
      <PostPostedList
        {...restProps}
      />
  );
}


export default compose(
  connect(
    (state) => ({
      curUserPosts: state.PostsState.usersPosts,
      isFetching: state.FetchingState[POSTS],
    }),
    { getAllMyPosts, ratePostThunk, deletePostThunk }),
)(PostPostedListAPI)
