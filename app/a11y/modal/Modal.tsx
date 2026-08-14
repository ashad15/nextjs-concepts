import { useContext } from "react";
import { UserContainerContext } from "../userContainer/UserContainer";
import { createPortal } from "react-dom";

const Modal = () => {
  const containerContext = useContext(UserContainerContext);

  console.log({ containerContext });

  return (
    <div
    role = 'dialog'
    aria-modal = 'true'
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: "0",
        left: "0px",
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "50vw",
          height: "50vh",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            justifyContent: "spaces-between",
            width: "100%",
            display: "flex",
          }}
        >
          <h1> User Info</h1>
          <button
            onClick={() => {
              containerContext?.setCurrentSelectedUser(null);
            }}
          >
            close
          </button>
        </header>
        <section style={{ flex: "1 auto" }}>
          {containerContext?.currentSelectedUser?.name}
          {containerContext?.currentSelectedUser?.deafultDesc}
        </section>
        <footer>
          <div
            tabIndex={0}
            aria-label="Modal close btn"
            style={{ width: "40px", height: "40px", background: "grey" }}
          >
            close btn
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
