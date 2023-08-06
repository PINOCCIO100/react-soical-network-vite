/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { AUTH } from './store_rtk/reducers/fetchingReducer';
import { handleAuthStatus } from './store_rtk/reducers/authReducer';

import { App } from './App';

import Preloader from './components/sharedComponents/Preloader/Preloader';


function AppContainer(props) {
  const {handleAuthStatus} = props
  useEffect(() => {
    handleAuthStatus()
  }, [handleAuthStatus]);
  return props.isFetching ?
  <Preloader /> :
  <App />
}

export default connect((state) => {
  return {
    isAuth: state.Auth.isAuth,
    isFetching: state.FetchingState[AUTH],
  }
}, { handleAuthStatus })(AppContainer)
