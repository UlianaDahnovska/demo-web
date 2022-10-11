import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";
import React from "react";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: React.FC<PropsType> = (props) => {

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