import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { getCompanionProfile, getMyProfile, getUserDialog } from '../../../../store/reducers/usersMessagesReducer';

import { DIALOGS } from "../../../../store/reducers/fetchingReducer";
import Preloader from "../../../sharedComponents/Preloader/Preloader";
import DialogsMessagesList from "../DialogsMessagesList/DialogsMessagesList";

const DialogsMessagesListAPI = (props) => {
  const { userID } = useParams();
  const { pathname } = useLocation();
  const {
    getUserDialog,
    getMyProfile,
    getCompanionProfile,
  } = props

  useEffect(() => {
    if (!userID) return;
    getUserDialog(userID)
    getMyProfile();
    getCompanionProfile(userID);
  }, [pathname, getUserDialog, getMyProfile, getCompanionProfile, userID])
  
  return (
    props.isFetching ?
      <Preloader /> :
      < DialogsMessagesList
        curUserMessages={props.curUserMessages}
        myProfile={props.myProfile}
        companionProfile={props.companionProfile}
      />
  )
}

export const DialogsMessagesListContainer = connect(
  (state) => ({
    curUserMessages: state.DialogsState.usersMessages,
    isFetching: state.FetchingState[DIALOGS],
    myProfile: state.DialogsState.myProfile,
    companionProfile: state.DialogsState.companionProfile,
  }), {
  getUserDialog,
  getMyProfile,
  getCompanionProfile
})(DialogsMessagesListAPI);
