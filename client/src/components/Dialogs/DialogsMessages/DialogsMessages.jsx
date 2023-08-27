import { useDispatch, useSelector } from 'react-redux';
import FormikTextInput from '../../sharedComponents/FormikTextInput/FormikTextInput';
import styles from './DialogsMessages.module.scss';

import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createMessage, setCurrentUserSenderText, setMessageSenderText } from '../../../store/reducers/usersMessagesReducer';
import { DialogsMessagesListContainer } from './DialogsMessagesListContainer/DialogsMessagesListContainer';

export function DialogsMessages() {
  return (
    <div className={styles.DialogsMessages}>
      <div className={styles.DialogsMessages__container + " scrollBar"}>
        <DialogsMessagesListContainer />
      </div>
      <DialogTextInputWrapper
        className={styles.DialogsMessages__TextInput}
      />
    </div >
  );
}


function DialogTextInputWrapper(props) {

  const dispatch = useDispatch();
  
  const sendMessage = useCallback((message) => dispatch(createMessage(message)), [dispatch]);
  const handleInitText = useCallback(text => dispatch(setMessageSenderText(text)),[dispatch])
  const { userID } = useParams()
  const companionProfile = useSelector(state => state.DialogsState.companionProfile)

  // TODO: Работает, но не до конца понятно как. Разобраться
  useEffect(() => {
    dispatch(setCurrentUserSenderText())
  }, [userID, dispatch, companionProfile])

  const initText = useSelector((state) => (
    state.DialogsState.usersMessageSenderText.currentUser
  ))
  return (
    <>
      <FormikTextInput
        initText={initText}
        handleInitText={handleInitText}
        handleSubmit={sendMessage}
        {...props}
      />
    </>
  );
}
