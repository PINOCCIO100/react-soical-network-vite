import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import fetchingReducer from './reducers/fetchingReducer'
import usersMessagesReducer from './reducers/usersMessagesReducer'
import usersPostsReducer from './reducers/usersPostsReducer'
import usersProfileInfoReducer from './reducers/usersProfileInfoReducer'
import usersPageReducer from './reducers/usersPageReducer'


export const store = configureStore({
  reducer: {
    PostsState: usersPostsReducer,
    FetchingState: fetchingReducer,
    Auth: authReducer,
    ProfileState: usersProfileInfoReducer,
    DialogsState: usersMessagesReducer,
    UsersPage: usersPageReducer,
  }
})


// TODO: потом удалить
window.store = store