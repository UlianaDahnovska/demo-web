import './App.css';
import NavBar from "./components/NavBar/NavBar";
import {Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/login/Login";
import {Component} from "react";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import DialogsContainer from './components/Dialogs/DialogsContainer'
import ProfileContainer from "./components/Profile/ProfileContainer";


class App extends Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavBar/>
                <div className='app-wrapper-content'>
                        <Routes>
                            <Route path="/profile" element={<ProfileContainer/>}>
                                <Route path=":userId" element={<ProfileContainer/>}/>
                            </Route>
                            <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                            <Route path='/news' element={<News/>}/>
                            <Route path='/music' element={<Music/>}/>
                            <Route path='/settings' element={<Settings/>}/>
                            <Route path='/users' element={<UsersContainer/>}/>
                            <Route path='/login' element={<Login/>}/>
                        </Routes>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App);
