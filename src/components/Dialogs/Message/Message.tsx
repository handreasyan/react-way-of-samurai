import styles from "./Message.module.css";

interface IProps {
  message:string
}

const Message:React.FC<IProps> = ({ message }) => {
  return <div className={styles.message}>{message}</div>;
};

export default Message;
