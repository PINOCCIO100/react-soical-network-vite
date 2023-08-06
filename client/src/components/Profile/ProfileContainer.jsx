/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { PROFILE_INFO } from '../../store_rtk/reducers/fetchingReducer';

import { getUserProfileInfo, resetProfile } from '../../store_rtk/reducers/usersProfileInfoReducer';

import Preloader from '../sharedComponents/Preloader/Preloader';
import Profile from './Profile';

function ProfileContainerAPI(props) {
  const { getUserProfileInfo, resetProfile } = props;
  const userID = useParams().userID ?? props.currentUserID;

  useEffect(() => {
    getUserProfileInfo(userID);
    return () => {
      resetProfile();
    }
  }, [userID, getUserProfileInfo, resetProfile])
  return props.isFetching ?
    <Preloader /> :
    <Profile
      userProfileInfo={props.userProfileInfo}
    />
}

export default compose(
  connect(
    (state) => ({
      currentUserID: state.Auth.id,
      userProfileInfo: state.ProfileState.userProfileInfo,
      isFetching: state.FetchingState[PROFILE_INFO],
    }),
    { getUserProfileInfo, resetProfile }
  ),
)(ProfileContainerAPI)


