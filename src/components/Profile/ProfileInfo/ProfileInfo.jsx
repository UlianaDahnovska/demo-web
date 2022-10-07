import classes from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import UserPhoto from '../../../assets/images/user.png';

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large || UserPhoto} className={classes.mainPhoto}/>
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}


                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;