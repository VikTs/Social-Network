import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserProfile, getUserStatus, updateUserStatus } from '../redux/profile-reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 5382;
    }
    this.props.getUserProfile(userId);

    this.props.getUserStatus(userId)
  }

  render() {
    return (
      <Profile {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
      />
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profileState.profile,
  status: state.profileState.status
})

export default compose( //конвеер, перекидывает элемент, снизу вверх
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
  withRouter,
  //withAuthRedirect
)(ProfileContainer)