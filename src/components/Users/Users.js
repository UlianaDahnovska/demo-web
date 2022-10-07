import Paginator from "../common/Paginator/Paginator";
import User from "./User";


let Users = (props) => {

    return (
        <div>
            <div>
                <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                           onPageChanged={props.onPageChanged} currentPage={props.currentPage}/>
            </div>
            <div>
                {props.users.map(u => <User user={u}
                                            followingInProgress={props.followingInProgress}
                                            unfollow={props.unfollow}
                                            follow={props.follow}
                                            key={u.id}/>)
                }
            </div>
        </div>)
}

export default Users