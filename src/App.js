import "./App.css";
import { Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app_wrapper_content">
        <Route path="/profile" render={() => <ProfileContainer />} />
        <Route path="/dialogs" render={() => <DialogsContainer />} />
        <Route path="/users" render={() => <UsersContainer />} />

        {/* */}
        <Route path="/music" render={() => <Music />} />
        <Route path="/news" render={() => <News />} />
      </div>
    </div>
  );
}
export default App;
