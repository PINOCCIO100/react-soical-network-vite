import { configureStore } from '@reduxjs/toolkit'
import { fetcher } from '../api/fetcher'
import authReducer, { handleLogout } from './reducers/authReducer'
import fetchingReducer from './reducers/fetchingReducer'
import usersMessagesReducer from './reducers/usersMessagesReducer'
import usersPageReducer from './reducers/usersPageReducer'
import usersPostsReducer from './reducers/usersPostsReducer'
import usersProfileInfoReducer from './reducers/usersProfileInfoReducer'


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

// Поместил сюда, чтобы не было круговых импортов
// Интерсептер для axios запросов. Можно обрабатывать все запросы/ответы
fetcher.interceptors.response.use((res) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Если статус == 299 (клиент не авторизован / сессия просрочена), то любой запрос на сервер вызывает logout
  if (res.status === 299) {
    store.dispatch(handleLogout())
  }
  return res
},
  (e) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(e)
  })