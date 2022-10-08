import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, updateStatus} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const withRouter = WrappedComponent => props => {
    const params = useParams();
        return (
            <WrappedComponent
                {...props}
                params={params}
            />
        );
};

class ProfileContainer extends React.Component{

    refreshProfile() {
        let userId = this.props.params.userId;
        if (!userId){
            userId = this.props.authorizedUserId;
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.params.userId !== prevProps.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}
                     isOwner={!this.props.params.userId}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
            />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(connect(mapStateToProps,
    {getUserProfile, getStatus, updateStatus, savePhoto}), withRouter, withAuthRedirect)(ProfileContainer)


