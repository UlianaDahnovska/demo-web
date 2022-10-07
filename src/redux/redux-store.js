import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import sideBarReducer from "./SideBar-reducer";
import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./Users-reducer";
import authReducer from "./auth-reducer";
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";


let store = configureStore({
    reducer: {
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        sidebar: sideBarReducer,
        usersPage: usersReducer,
        auth: authReducer,
        form: formReducer,
        app: appReducer
    }
})


window.store = store
export default store