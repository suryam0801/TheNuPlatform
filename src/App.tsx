import { useContext } from "react";
import { AuthContext } from "./Components/Auth/Context/AuthContext";
import Welcome from "./Components/Auth/SigninOrLogin/SigninOrLogin";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import Signup from "./Components/Auth/Signup/Signup";
import Influencer from "./Components/Influencer/InfluencerMain/Influencer";
import ChatView from "./Components/Chat/ChatView";
import { useWindowSize } from "react-use";
import TestChatView from "./TestChatView";

function App() {
  const user = useContext(AuthContext);

  return (
    <div className="App">
        {!user ? (
          <Routes>
            <Route path="/" element={<Welcome></Welcome>} />
            <Route path="/:id" element={<TestChatView></TestChatView>} />
            <Route path="/Login" element={<Login></Login>} />
            <Route path="/Signup" element={<Signup></Signup>} />
          </Routes>
        ) : (
          <Influencer></Influencer>
        )}
    </div>
  );
}

export default App;
