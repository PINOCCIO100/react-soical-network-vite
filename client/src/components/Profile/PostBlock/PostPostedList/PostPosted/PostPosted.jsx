import { useSelector } from 'react-redux';
import ProfilePhoto from '../../../../sharedComponents/ProfilePhoto/ProfilePhoto';
import ButtonRating from './ButtonRating/ButtonRating';
import style from './PostPosted.module.scss';

function PostPosted({ post, onLike, onDislike, onDelete }) {

  let postDate = new Date(post.postDate).toLocaleString('ru-Ru')
  const curUsId = useSelector(state => state.Auth.id);

  return (
    <div className={style.postPosted}>
      < ProfilePhoto
        id={post.senderID}
        src={post.photo}
        className={style.postPosted__userProfilePhoto}
      />
      <div className={style.postPosted__msgAndBtnsCont}>
        <div className={style.postPosted__message}>
          <p>
            {post.post}
          </p>
        </div>
        <div className={style.postPosted_postFooter}>

          <div className={style.postPosted__postFooter__left}>
            <span className={style.postPosted__postDate}>{postDate}</span >
            {curUsId != post.senderID ? null :
              <>
                <span
                  className={[style.postPosted__edit, style.postPosted__additionalButtons].join(' ')}
                >Edit</span>
                <span
                  className={[style.postPosted__delete, style.postPosted__additionalButtons].join(' ')}
                  onClick={onDelete}
                >Delete</span>
              </>}
          </div>
          <div className={style.postPosted__postFooter__right}>
            <ButtonRating
              active={post.rating.myRate === 1 ? true : false}
              like={post.rating.likes}
              action={onLike}
            />
            <ButtonRating
              active={post.rating.myRate === -1 ? true : false}
              dislike={post.rating.dislikes}
              action={onDislike}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPosted;