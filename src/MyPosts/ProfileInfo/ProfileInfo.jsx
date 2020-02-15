import React from 'react';
import classes from './ProfileInfo.module.css'
import Preloader from '../../components/common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({profile, status, updateUserStatus, ...props}) => {
  if(!profile){
    return <Preloader />
  }
  return (
    <div>
      <div className={classes.descriptionBlock}>
        <img src={profile.photos.large} />

        <ProfileStatusWithHooks 
        status={status} 
        updateUserStatus={updateUserStatus}/>
        
        <p>{profile.aboutMe}</p>
        <p>{'facebook: '+profile.contacts.facebook}</p>
        </div>
    </div>
  );
}

export default ProfileInfo;