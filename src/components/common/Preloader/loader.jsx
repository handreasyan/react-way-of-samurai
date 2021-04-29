import loader from "../../../assets/images/loader.gif";

const Preloader = (props) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        width: "100%",
        height: "600px",
        position: "absolute",
      }}
    >
      <img
        alt="Some Alt"
        src={loader}
        style={{
          position: "absolute",
          top: "150px",
          left: " 100px",
          width: "200px",
          height: "200px",
        }}
      />
    </div>
  );
};

export default Preloader;
