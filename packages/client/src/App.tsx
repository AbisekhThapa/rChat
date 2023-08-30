import UserContext from "./components/AccountContext";
import ToggleComponent from "./components/ToggleComponent";
import Views from "./components/Views";
import socket from "./socket";

function App() {
  socket.connect();
  return (
    <>
      <UserContext>
        <Views />
        <ToggleComponent />
      </UserContext>
    </>
  );
}

export default App;
