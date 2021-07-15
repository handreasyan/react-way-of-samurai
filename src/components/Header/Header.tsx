import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import React from "react";


interface IProps {
  isAuth: boolean,
  login: string,
  userPhoto: undefined | string
  logout:()=> { type:string,payload:{ [key:string]:any } }
}

const Header:React.FC<IProps> = (props) => {
  function setUserNameAndPhoto() {
    if (props.isAuth) {
      return (
        <div className={classes.loginBlock}>
          <div>{props.login}</div>
          <img
            src={
              props.userPhoto
                ? props.userPhoto
                : "https://img.icons8.com/bubbles/2x/4a90e2/user-male.png"
            }
            alt="UserIMG"
          />
          <button onClick={props.logout}>Log Out</button>
        </div>
      )
    } else {
      return <NavLink to={"/login"}>Log In</NavLink>;
    }
  }

  return (
    <header className={classes.header}>
      <div className={classes.img_block}>
        <NavLink to={"/"}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/BB_Logo_%28TM%29.png"
            alt="Logo"
          />
        </NavLink>
      </div>
      <h2>Bodybook</h2>
      {setUserNameAndPhoto()}
    </header>
  );
};

export default Header;
