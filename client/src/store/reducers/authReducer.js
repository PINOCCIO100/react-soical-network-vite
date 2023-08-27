import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { reqAuthStatus } from "../../api/reqAuthStatus";
import { reqAuthUser } from "../../api/reqAuthUser";
import { AUTH, setFetching } from "../reducers/fetchingReducer";

export const handleLogout = createAsyncThunk(
  'Auth/handleLogout',
  async (arg, { dispatch }) => {
    dispatch(setUserData({
      id: null,
      email: null,
      name: null,
      isAuth: false,
    }))
    Cookies.remove('session');
  }
)

export const handleLogin = createAsyncThunk(
  'Auth/handleLogin',
  async ({ email, password, rememberMe }, { dispatch }) => {
    const res = await reqAuthUser({ email, password, rememberMe });
    if (res.resultCode === 0) {
      const { id, email, name } = res.data
      dispatch(setUserData({ id, email, name, isAuth: true }));
    }
  }
)

export const handleAuthStatus = createAsyncThunk(
  'Auth/handleAuthStatus',
  async (arg, { dispatch }) => {
    dispatch(setFetching([AUTH, true]));
    const res = await reqAuthStatus()
    if (res.resultCode === 0) {
      const { id, email, name } = res.data
      dispatch(setUserData({ id, email, name, isAuth: true }));
    }
    dispatch(setFetching([AUTH, false]));
  }
)

const authReducer = createSlice({
  name: 'Auth',
  initialState: {
    id: null,
    email: null,
    name: null,
    isAuth: false,
  },
  reducers: {
    setUserData: (state, action) => {
      const { id, email, name, isAuth, } = action.payload
      state.id = id
      state.email = email
      state.name = name
      state.isAuth = isAuth
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    }
  }
})

export const { setIsAuth, setUserData } = authReducer.actions
export default authReducer.reducer