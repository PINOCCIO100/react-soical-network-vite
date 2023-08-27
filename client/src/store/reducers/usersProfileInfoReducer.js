import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reqUserProfileInfo } from "../../api/reqUserProfileInfo";
import { reqUsersAvatar } from "../../api/reqUsersAvatar";
import { reqCreateStatus } from "../../api/reqUserStatus";
import { PROFILE_INFO, setFetching } from "../reducers/fetchingReducer";


export const getUserProfileInfo = createAsyncThunk(
  'ProfileState/getUserProfileInfo',
  async (userID, { dispatch, getState }) => {
    if (!getState().Auth.isAuth) return //TODO: Нужно зарефакторить 
    const res = await reqUserProfileInfo(userID);
    dispatch(setUserProfile({
      ...res,
      photo: reqUsersAvatar(userID)
    }));
    dispatch(setFetching([PROFILE_INFO, false]));
  }
)

export const setStatusThunk = createAsyncThunk(
  'ProfileState/setStatusThunk',
  async (text, { dispatch }) => {
    const res = await reqCreateStatus(text);
    if (res.resultCode === 0) {
      dispatch(setStatus(text));
    }
  }
)

export const resetProfile = createAsyncThunk(
  'ProfileState/resetProfile',
  (arg, { dispatch }) => {
    dispatch(setUserProfile(null))
    dispatch(setFetching([PROFILE_INFO, true]));
  }
)

const usersProfileInfoReducer = createSlice({
  name: 'ProfileState',
  initialState: {
    userProfileInfo: null,
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfileInfo = action.payload
    },
    setStatus: (state, action) => {
      state.userProfileInfo.status = action.payload
    },
  },
})

export const { setCurrentUserID, setStatus, setUserProfile } = usersProfileInfoReducer.actions
export default usersProfileInfoReducer.reducer