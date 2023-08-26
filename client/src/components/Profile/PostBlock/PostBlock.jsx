import { useDispatch, useSelector } from 'react-redux';
import styles from './PostBlock.module.scss';

import { useCallback, useEffect } from 'react';
import { createPost, setCurrentPostPosterText, setCurrentUserPosterTextThunk } from '../../../store_rtk/reducers/usersPostsReducer';
import FormikTextInput from '../../sharedComponents/FormikTextInput/FormikTextInput';
import PostPostedListContainer from './PostPostedList/PostPostedListContainer';


function PostBlock() {
  return (
    <div className={styles.postBlock}>
      <h1 className={styles.postBlock__title}>My posts</h1>
      <PostTextInputWrapper/>
      <PostPostedListContainer
        className={styles.postBlock__TextInput}
      />
    </div>
  );
}

export default PostBlock;

function PostTextInputWrapper(props) {

  const dispatch = useDispatch();

  const sendPost = useCallback((post) => dispatch(createPost(post)), [dispatch])
  const handleInitText = useCallback(text => dispatch(setCurrentPostPosterText(text)), [dispatch])

  useEffect(() => {
    dispatch(setCurrentUserPosterTextThunk())
  }, [dispatch])

  const initText = useSelector((state) => (
    state.PostsState.usersPostPosterText?.currentUser ?? ''
  ))
  return (
    <>
      <FormikTextInput
        initText={initText}
        handleInitText={handleInitText}
        handleSubmit={sendPost}
        {...props}
      />
    </>
  );
}
