import {usersApi} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";

const FOLLOW = 'my-app/users/FOLLOW'
const UNFOLLOW = 'my-app/users/UNFOLLOW'
const SET_USERS = 'my-app/users/SET_USERS'
const SET_CURRENT_PAGE = 'my-app/users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'my-app/users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'my-app/users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 50,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> //array of users ids
}

type InitialStateType = typeof initialState

const UsersReducer = (state=initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)}
        }
        default:
            return state
    }

}

//Action
type followSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): followSuccessActionType => ({type: FOLLOW, userId})

type unfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): unfollowSuccessActionType => ({type: UNFOLLOW, userId})

type setUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): setUsersActionType => ({type: SET_USERS, users})

type setCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})

type setTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})

type toggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})

type toggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingProgressActionType => (
    {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}
)

//Thunk
export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))

    let response = await usersApi.requestUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(response.data.items))
    dispatch(setTotalUsersCount(response.data.totalCount))
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersApi.follow.bind(usersApi), followSuccess)
}

export const unfollow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersApi.unfollow.bind(usersApi), unfollowSuccess)
}

export default UsersReducer