import './App.css'
import React, {Component } from "react";
import { compose } from 'redux'
import { connect ,Provider} from 'react-redux'
import {Redirect, Switch, withRouter} from 'react-router'
import { BrowserRouter,Route } from 'react-router-dom'
import store, {AppStateType} from './redux/redux_store'
import { initializeApp } from './redux/appReducer'
import withSuspense from "./hoc/withSuspense";
import Navbar from './components/Navbar/Navbar'
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import LoginPage from './components/Login/Login'
import Preloader from './components/common/Preloader/loader'
const DialogsContainer = React.lazy( ()=> import('./components/Dialogs/DialogsContainer'))
const Music = React.lazy( ()=> import('./components/Music/Music'))
const News = React.lazy( ()=> import('./components/News/News'))

type MapPropsType = ReturnType<typeof mstp>
type DispatchPropsType = { initializeApp:()=>void }

class App extends Component<DispatchPropsType & MapPropsType> {
  catchAllUnhandledErrors(e:PromiseRejectionEvent){
    console.warn("Some Promise Rejected:Global error from App.js")
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection',this.catchAllUnhandledErrors)
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection',this.catchAllUnhandledErrors)
  }
  render() {
    const SuspendedDialog =  withSuspense(DialogsContainer)
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app_wrapper_content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to={'/profile'} />} />

            <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <LoginPage />} />

            <Route path="/dialogs" render={()=> <SuspendedDialog /> } />
            <Route path="/music" render={()=>withSuspense(Music)} />
            <Route path="/news" render={()=>withSuspense(News)} />

            {/*ete vohcmi route chhamapatasxani URL _in kvercni path='*' tvac routin */}
            <Route path="*" render={()=> <div>404 Not Found</div>} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mstp = (state:AppStateType) => ({
  initialized: state.app.initialized,
})

let AppContainer = compose<React.ComponentType>(withRouter, connect(mstp, { initializeApp }))(App)

let SamuraiJSApp:React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default SamuraiJSApp
