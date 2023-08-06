import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import fetchingReducer from './reducers/fetchingReducer'
import usersProfileInfoReducer from './reducers/usersProfileInfoReducer'
import usersPostsReducer from './reducers/usersPostsReducer'

export const store = configureStore({
  reducer: {
    PostsState: usersPostsReducer,
    FetchingState: fetchingReducer,
    Auth: authReducer,
    ProfileState: usersProfileInfoReducer,
  }
})

// TODO: потом удалить
window.store = store