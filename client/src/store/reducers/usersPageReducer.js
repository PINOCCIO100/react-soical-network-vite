import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reqFollowStatus, reqToggleFollowUser } from "../../api/reqFollow";
import { reqUsersAvatar } from "../../api/reqUsersAvatar";
import { reqUsersList } from "../../api/reqUsersList";
import { USERS_PAGE, setFetching } from "../reducers/fetchingReducer";

const usersPageReducer = createSlice({
  name: 'UsersPage',
  initialState: {
    users: [],
    pageSize: 5,
    currentPage: 1,
    totalUsersCount: 0,
    followingProcess: [],
  },
  reducers: {
    toggleFollow: (state, action) => {
      const { userID, isFollow } = action.payload;
      // !!!!!
      state.users.forEach(user => {
        if (user.id === userID) user.followed = isFollow
        return user
      })
    },
    toggleFollowingProcess: (state, action) => {
      const { userID, isFollowingProcess } = action.payload;
      isFollowingProcess ?
        state.followingProcess.push(userID) :
        state.followingProcess = state.followingProcess.filter(id => id !== userID)
    },
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setTotalCount: (state, action) => {
      state.totalUsersCount = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
  },

})


export const getUsers = createAsyncThunk(
  'usersPageReducer/getUsers',
  async (arg, { dispatch, getState }) => {
    dispatch(setFetching([USERS_PAGE, true]));
    const { pageSize, currentPage } = getState().UsersPage
    const { usersList, totalCount } = await reqUsersList(pageSize, currentPage)
    dispatch(setTotalCount(totalCount));
    const avatars = reqUsersAvatar(usersList.map(p => p.id));
    for (let i = 0; i < usersList.length; i++) {
      usersList[i].photo = avatars[i];
      usersList[i].followed = await reqFollowStatus(usersList[i].id);
    }
    dispatch(setUsers(usersList));
    dispatch(setFetching([USERS_PAGE, false]));
  }
)
export const handleFollow = createAsyncThunk(
  'usersPageReducer/handleFollow',
  async ({ userID, isFollow }, { dispatch }) => {
    dispatch(toggleFollowingProcess({ userID, isFollowingProcess: true }));
    const res = await reqToggleFollowUser(userID, isFollow);
    if (res.resultCode === 0) {
      dispatch(toggleFollow({ userID, isFollow }));
    }
    dispatch(toggleFollowingProcess({ userID, isFollowingProcess: false }));
  }
)

export const { toggleFollow, toggleFollowingProcess, setUsers, setCurrentPage, setTotalCount, setPageSize } = usersPageReducer.actions

export default usersPageReducer.reducer
