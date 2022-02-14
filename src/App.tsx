import { useContext } from "react";
import { AuthContext } from "./Components/Auth/Context/AuthContext";
import Welcome from "./Components/Auth/SigninOrLogin/SigninOrLogin";
import { Route, Routes } from "react-router-dom";
import Influencer from "./Components/Influencer/InfluencerMain/Influencer";
import ChatView from "./Components/Chat/ChatView";
import SigninOrLogin from "./Components/Auth/SigninOrLogin/SigninOrLogin";

function App() {
  const user = useContext(AuthContext);

  return (
    <div className="App">
        {!user ? (
          <Routes>
            <Route path="/" element={<Welcome></Welcome>} />
            <Route path="/:id" element={<ChatView></ChatView>} />
            <Route path="/Login" element={<SigninOrLogin></SigninOrLogin>} />
          </Routes>
        ) : (
          <Influencer></Influencer>
        )}
    </div>
  );
}

export default App;
