import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reqMyVote, reqRate, reqVotes } from "../../api/reqRate";
import { reqAllUserPosts, reqDeletePost, reqPublishPost } from "../../api/reqUserPosts";
import { reqUsersAvatar } from "../../api/reqUsersAvatar";
import { POSTS, setFetching } from "./fetchingReducer";

export const getAllMyPosts = createAsyncThunk(
  'usersPostsReducer/getAllMyPosts',
  async (arg, { dispatch, getState }) => {
    const id = getState().ProfileState.userProfileInfo?.id; // TODO: DRY!!
    if (!id) return;
    dispatch(setFetching([POSTS, true]));
    const posts = await reqAllUserPosts(id);
    for (let i = 0; i < posts.length; i++) {
      posts[i].photo = reqUsersAvatar(posts[i].senderID);
      const resVotes = await reqVotes(posts[i]._id);
      const resMyVotes = await reqMyVote(posts[i]._id);
      if (resVotes.resultCode === 0) {
        posts[i].rating.likes = resVotes.data.likes;
        posts[i].rating.dislikes = resVotes.data.dislikes;
      }
      if (resMyVotes.resultCode === 0) {
        posts[i].rating.myRate = resMyVotes.data.myRate;
      }
    }
    dispatch(setUserPosts(posts));
    dispatch(setFetching([POSTS, false]));
  }
)

export const createPost = createAsyncThunk(
  'usersPostsReducer/createPost',
  async (message, { dispatch, getState }) => {
    const curUsID = getState().Auth.id;
    const id = getState().ProfileState.userProfileInfo?.id; // TODO: DRY!!
    if (!id) return;
    // const message = getState().PostsState.usersPostPosterText[id];
    const res = await reqPublishPost(id, message);
    if (res.resultCode === 0) {
      dispatch(addPost({
        ...res.data,
        photo: reqUsersAvatar(curUsID)
      }));
      // dispatch(setPostPosterText(id, ''));
    }
  }

)

export const setCurrentPostPosterText = createAsyncThunk(
  'usersPostsReducer/setCurrentPostPosterText',
  (text, { dispatch, getState }) => {
    const userID = getState().ProfileState.userProfileInfo?.id; // TODO: DRY!!
    if (!userID) return;
    dispatch(setPostPosterText({ userID, text }));
  }
)

export const ratePostThunk = createAsyncThunk(
  'usersPostsReducer/setCurrentPostPosterText',
  async ({ postID, rating }, { dispatch }) => {
    const res = await reqRate(postID, rating, 'post');
    if (res.resultCode === 0) {
      //TODO: заблокировать спам лайками
      const { myRate, likes, dislikes } = res.data
      dispatch(ratePost({ postID, myRate, likes, dislikes }));
    }
  }
)

export const setCurrentUserPosterTextThunk = createAsyncThunk(
  'usersPostsReducer/setCurrentUserPosterText',
  (arg, { dispatch, getState }) => {
    const userID = getState().ProfileState.userProfileInfo?.id;
    if (!userID) return;
    dispatch(setCurrentUserPosterText(userID));
  }
)

export const deletePostThunk = createAsyncThunk(
  'usersPostsReducer/deletePostThunk',
  async ({ postID, senderID, accepterID }, { dispatch }) => {
    const res = await reqDeletePost(postID, senderID, accepterID)
    if (res.resultCode == 0) {
      dispatch(deletePost(postID))
    }
  }
)

const usersPostsReducer = createSlice({
  name: 'usersPostsReducer',
  initialState: {
    usersPosts: [],
    usersPostPosterText: {
      currentUser: ''
    },
  },
  reducers: {
    setPostPosterText: (state, action) => {
      const { userID, text } = action.payload
      state.usersPostPosterText[userID] = text
    },
    setCurrentUserPosterText: (state, action) => {
      state.usersPostPosterText.currentUser = state.usersPostPosterText[action.payload]
    },
    addPost: (state, action) => {
      state.usersPosts.push(action.payload)
    },
    deletePost: (state, action) => {
      const postID = action.payload
      state.usersPosts = state.usersPosts.filter(post => post._id != postID)
    },
    setUserPosts: (state, action) => {
      state.usersPosts = action.payload
    },
    ratePost: (state, action) => {
      const { postID, myRate, likes, dislikes } = action.payload
      state.usersPosts = state.usersPosts.map(post => post._id === postID ?
        { ...post, rating: { myRate, likes, dislikes, } } : post
      )
    },
  }
})

export const { addPost, ratePost, setPostPosterText, setUserPosts, setCurrentUserPosterText, deletePost } = usersPostsReducer.actions
export default usersPostsReducer.reducer