import classes from './Post.module.css'
const Post = (props) => {
    return (
        <div className={classes.posts}>
            <div className={classes.item}>
                <img src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDAFrRfae2sKmnoX1gsKgVKSzhxT6gSlZxYQ&usqp=CAU'/>
                {props.message}
                <div>
                    <span>Like {props.likesCount}</span>
                </div>
            </div>
        </div>
    )
}

export default Post;