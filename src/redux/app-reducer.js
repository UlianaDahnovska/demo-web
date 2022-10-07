import {authApi} from "../api/api";
import {stopSubmit} from "redux-form";
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS= 'my-app/app/INITIALIZED_SUCCESS'

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state, initialized: true
            }
        default:
            return state
    }
}

//Action
export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

//Thunk
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })
}

export default appReducer
