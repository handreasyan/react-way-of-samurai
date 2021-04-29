import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.img_block}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/4a/BB_Logo_%28TM%29.png"
          alt="Logo"
        />
      </div>
      <h2>Bodybook</h2>
    </header>
  );
};

export default Header;
