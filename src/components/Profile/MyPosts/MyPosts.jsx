import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {MaxLengthCreator, required} from "../../../utils/validators/validator";
import {Textarea} from "../../common/FormsControls/FormsControls";
import React from "react";

const maxLength10 = MaxLengthCreator(10)

const MyPosts = React.memo(props => {

    let postsElements = props.profilePage.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let onAddPost = (values) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostReduxForm onSubmit={onAddPost}/>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
});

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={Textarea} placeholder='Enter your post'
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostReduxForm = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default MyPosts;