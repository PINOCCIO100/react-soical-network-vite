/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { POSTS } from "../../../../store_rtk/reducers/fetchingReducer";
import { getAllMyPosts, ratePostThunk } from '../../../../store_rtk/reducers/usersPostsReducer';

import Preloader from '../../../sharedComponents/Preloader/Preloader';
import PostPostedList from "./PostPostedList";

function PostPostedListAPI(props) {
  useEffect(() => {
    props.getAllMyPosts();
  }, [])
  return (
    props.isFetching ?
      <Preloader /> :
      <PostPostedList
        {...props}
      />
  );
}


export default compose(
  connect(
    (state) => ({
      curUserPosts: state.PostsState.usersPosts,
      isFetching: state.FetchingState[POSTS],
    }),
    { getAllMyPosts, ratePostThunk }),
)(PostPostedListAPI)
