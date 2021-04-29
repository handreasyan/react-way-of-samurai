import styles from "./Friends.module.css";

function Friend() {
  return (
    <div className={styles.friend}>
      <img
        src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
        alt="Friend"
      />
    </div>
  );
}

export default Friend;
