import s from './PostPostedList.module.scss';
import PostPosted from './PostPosted/PostPosted';

function PostPostedList(props) {
  //TODO: Разобраться почему столько ререндера
  return (
    <div className={s.postPostedList + " scrollBar"} >
      {
        props.curUserPosts.map((post) => {
          return (<PostPosted
            key={post._id}
            post={post}
            onLike={() => props.ratePostThunk({ postID: post._id, rating: 1 })}
            onDislike={() => props.ratePostThunk({ postID: post._id, rating: -1 })}
          />)
        })
      }
    </div>
  );
}

export default PostPostedList;