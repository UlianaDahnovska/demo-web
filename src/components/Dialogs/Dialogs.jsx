import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {MaxLengthCreator, required} from "../../utils/validators/validator";

const maxLength50 = MaxLengthCreator(50)

const Dialogs = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map( d => <DialogItem name={d.name} id={d.id}/> )
    let messageElements = state.messages.map( m => <Message message={m.message}/>)

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

    if (!props.isAuth) return <Navigate to={'/login'}/>

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messageElements}</div>
                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field name={"newMessageBody"} component={Textarea}
                       validate={[required, maxLength50]}
                       placeholder={"Enter your message"}/>
            </div>
            <div><button>Send</button></div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs;