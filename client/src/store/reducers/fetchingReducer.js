import { createSlice } from "@reduxjs/toolkit";

export const AUTH = 'AUTH';
export const DIALOGS = 'DIALOGS';
export const USERS_PAGE = 'USERS-PAGE';
export const PROFILE_INFO = 'PROFILE-INFO';
export const POSTS = 'POSTS';

export const fetchingReducer = createSlice({
  name: 'FetchingState',
  initialState: {
    'AUTH': true,
    'DIALOGS': true,
    'USERS-PAGE': true,
    'PROFILE-INFO': true,
    'POSTS': true,
  },
  reducers: {
    setFetching: (state, action) => {
      const [event, isFetching] = action.payload
      state[event] = isFetching
    },
  },
})

export const { setFetching } = fetchingReducer.actions
export default fetchingReducer.reducer