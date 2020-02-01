import React from 'react';
import classes from './ProfileInfo.module.css'
import Preloader from '../../components/common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus'

const ProfileInfo = (props) => {
  if(!props.profile){
    return <Preloader />
  }
  return (
    <div>
      {/* <div>
        <img src='https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg' />
      </div> */}
      <div className={classes.descriptionBlock}>
        <img src={props.profile.photos.large} />

        <ProfileStatus 
        status={props.status} 
        updateUserStatus={props.updateUserStatus}/>
        
        <p>{props.profile.aboutMe}</p>
        <p>{'facebook: '+props.profile.contacts.facebook}</p>
        </div>
    </div>
  );
}

export default ProfileInfo;