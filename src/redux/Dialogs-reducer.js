const SEND_MESSAGE = 'my-app/dialogs/SEND_MESSAGE';

let initialState = {
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
    ]
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody
            return  {...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer;