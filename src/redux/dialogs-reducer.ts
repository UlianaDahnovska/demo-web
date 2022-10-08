const SEND_MESSAGE = 'my-app/dialogs/SEND_MESSAGE';

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Andrew'},
        {id: 2, name: 'Masha'},
        {id: 3, name: 'Artyom'},
        {id: 4, name: 'Dasha'},
        {id: 5, name: 'Sasha'},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'hi'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'yo'},
        {id: 5, message: 'You'},
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {

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

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer;