import UserContext from "./components/AccountContext";
import ToggleComponent from "./components/ToggleComponent";
import Views from "./components/Views";

function App() {
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
