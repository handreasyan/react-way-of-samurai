import './App.css'
import React from "react";
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import LoginPage from './components/Login/Login'
import {Component} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { initializeApp } from './redux/appReducer'
import Preloader from './components/common/Preloader/loader'
import store from './redux/redux_store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import withSuspense from "./hoc/withSuspense";
const DialogsContainer = React.lazy( ()=> import('./components/Dialogs/DialogsContainer'))
const Music = React.lazy( ()=> import('./components/Music/Music'))
const News = React.lazy( ()=> import('./components/News/News'))

class App extends Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app_wrapper_content">
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/login" render={() => <LoginPage />} />

          <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
          <Route path="/music" render={withSuspense(Music)} />
          <Route path="/news" render={withSuspense(News)} />
        </div>
      </div>
    )
  }
}

const mstp = (state) => ({
  initialized: state.app.initialized,
})

let AppContainer = compose(withRouter, connect(mstp, { initializeApp }))(App)

let SamuraiJSApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default SamuraiJSApp
