import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import sideBarReducer from "./SideBar-reducer";

let store = {
    _state:  {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi,how are you?', likesCount: 12},
                {id: 2, message: 'It is my first post', likesCount: 10},
                {id: 3, message: 'It is my first post', likesCount: 10},
                {id: 4, message: 'It is my first post', likesCount: 10}
            ],
            newPostText: 'text'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Andrew'},
                {id: 2, name: 'Masha'},
                {id: 3, name: 'Artyom'},
                {id: 4, name: 'Dasha'},
                {id: 5, name: 'Sasha'},
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'hi'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'yo'},
                {id: 5, message: 'You'},
            ],
            newMessageBody: ''
        },
        sidebar: {}
    },
    _callSubscriber () {
        console.log('State changed')
    },

    getState() {
        return this._state
    },
    subscribe (observer) {
        this._callSubscriber = observer
    },

    dispatch (action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sideBarReducer(this._state.sidebar, action)
        this._callSubscriber(this._state);
    }
}

window.store = store
export default store;