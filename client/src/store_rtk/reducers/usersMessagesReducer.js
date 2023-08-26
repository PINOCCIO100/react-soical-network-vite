import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reqAuthStatus } from "../../api/reqAuthStatus";
import { reqSendMessage, reqUserDialog, reqUsersIDWithDialogs } from "../../api/reqUserDialogs";
import { reqUserProfileInfo } from "../../api/reqUserProfileInfo";
import { reqUsersAvatar } from "../../api/reqUsersAvatar";
import { DIALOGS, setFetching } from "../reducers/fetchingReducer";


const usersMessagesReducer = createSlice({
  name: 'usersMessagesReducer',
  initialState: {
    usersMessageSenderText: {
      currentUser: ''
    },
    usersMessages: [],
    usersWithDialogs: [],
    myProfile: {},
    companionProfile: {},
  },
  reducers: {

    setMessageSenderText: (state, action) => {
      state.usersMessageSenderText[state.companionProfile.id] = action.payload
    },
    setCurrentUserSenderText: (state) => {
      state.usersMessageSenderText.currentUser =
        state.usersMessageSenderText[state.companionProfile.id] ?? ''
    },

    setUsersWithDialogs: (state, action) => {
      state.usersWithDialogs = action.payload
    },
    setMessages: (state, action) => {
      state.usersMessages = action.payload
    },
    addMessage: (state, action) => {
      state.usersMessages.push(action.payload)
    },
    setMyProfile: (state, action) => {
      state.myProfile = action.payload
    },
    setCompanionProfile: (state, action) => {
      state.companionProfile = action.payload
    },
  }
})


export const getUsersWithDialogs = createAsyncThunk(
  'usersMessagesReducer/getUsersWithDialogs',
  async (arg, { dispatch }) => {
    const usersID = await reqUsersIDWithDialogs();
    dispatch(setUsersWithDialogs(usersID));
  }
)

export const getUserDialog = createAsyncThunk(
  'usersMessagesReducer/getUserDialog',
  async (userID, { dispatch }) => {
    dispatch(setFetching([DIALOGS], true));
    const messages = await reqUserDialog(userID);
    dispatch(setMessages(messages));
    dispatch(setFetching([DIALOGS, false]));
  }
)


export const getMyProfile = createAsyncThunk(
  'usersMessagesReducer/getMyProfile',
  async (arg, { dispatch }) => {
    const auth = await reqAuthStatus();
    const profile = {
      ...await reqUserProfileInfo(auth.data.id),
      photo: reqUsersAvatar(auth.data.id)
    }
    dispatch(setMyProfile(profile));
  }
)

export const getCompanionProfile = createAsyncThunk(
  'usersMessagesReducer/getCompanionProfile',
  async (userID, { dispatch }) => {
    const profile = {
      ...await reqUserProfileInfo(userID),
      photo: reqUsersAvatar(userID)
    }
    dispatch(setCompanionProfile(profile));
  }
)

export const createMessage = createAsyncThunk(
  'usersMessagesReducer/createMessage',
  async (message, { dispatch, getState }) => {
    const id = getState().DialogsState.companionProfile.id;
    const res = await reqSendMessage(id, message);
    if (res.resultCode === 0) {
      dispatch(addMessage(res.data));
    }
  }
)

export const { addMessage, setMessageSenderText, setCurrentUserSenderText, setCompanionProfile, setMessages, setMyProfile, setUsersWithDialogs } = usersMessagesReducer.actions
export default usersMessagesReducer.reducer
