import s from './Profile.module.scss';

import PostBlock from './PostBlock/PostBlock';
import UserCard from './UserCard/UserCard';

function Profile(props) {
  const seed = props.userProfileInfo.id;
  return (
    <div className={s.profile}>
      <div className={s.profileWrapper}>
        <div className={s.banner}>
          <img src={`https://picsum.photos/seed/${seed}/2000/1000`} alt="banner" />
        </div>
        <UserCard {...props} />
        <PostBlock />
      </div>
    </div>
  );
}

export default Profile;