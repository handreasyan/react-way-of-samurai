import "./App.css";
import {Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {Component} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import { withRouter } from "react-router";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/loader";

class App extends Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if(!this.props.initialized){
      return <Preloader />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer/>
        <Navbar/>
        <div className="app_wrapper_content">
          <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
          <Route path="/dialogs" render={() => <DialogsContainer/>}/>
          <Route path="/users" render={() => <UsersContainer/>}/>

          <Route path="/music" render={() => <Music/>}/>
          <Route path="/news" render={() => <News/>}/>
          <Route path="/login" render={() => <LoginPage/>}/>
        </div>
      </div>
    );
  }
}

const mstp = (state) => ({
  initialized:state.app.initialized
})

export default compose(withRouter,connect(mstp,{initializeApp}))(App);
