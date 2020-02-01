import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from '../../MyPosts/ProfileInfo/ProfileInfo';
import MyPostsContainer from '../../MyPosts/MyPostsContainer';

const Profile = (props) => {
  return (
    <div className={classes.content}>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus} />
      <div>
        <MyPostsContainer />
      </div>
    </div>
  );
}

export default Profile;