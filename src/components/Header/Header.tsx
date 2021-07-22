import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import React from "react";
import {dtype, mstpType} from "./HeaderContainer";

const Header:React.FC<mstpType & dtype> = ({isAuth,login,userPhoto,logout}) => {
  function setUserNameAndPhoto() {
    if (isAuth) {
      return (
        <div className={classes.loginBlock}>
          <div>{login}</div>
          <img
            src={
              userPhoto
                ? userPhoto
                : "https://img.icons8.com/bubbles/2x/4a90e2/user-male.png"
            }
            alt="UserIMG"
          />
          <button onClick={logout}>Log Out</button>
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
      <h2>BodyBook</h2>
      {setUserNameAndPhoto()}
    </header>
  );
};

export default Header;
