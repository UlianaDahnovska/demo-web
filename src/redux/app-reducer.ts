import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS= 'my-app/app/INITIALIZED_SUCCESS'

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
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
type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

//Thunk
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })
}

export default appReducer
