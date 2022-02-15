import { useContext } from "react";
import { AuthContext } from "./Components/Auth/Context/AuthContext";
import Welcome from "./Components/Auth/SigninOrLogin/SigninOrLogin";
import { Route, Routes } from "react-router-dom";
import Influencer from "./Components/Influencer/InfluencerMain/Influencer";
import ChatView from "./Components/Chat/ChatView";
import FullPageLoadingDisplay from "./Components/General/FullPageLoadingDisplay";

function App() {
  const user = useContext(AuthContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<Welcome></Welcome>} />
        <Route
          path="/"
          element={user ? <Influencer></Influencer> : <Welcome></Welcome>}
        />
        <Route path="/:username" element={<ChatView></ChatView>} />
      </Routes>

      <FullPageLoadingDisplay></FullPageLoadingDisplay>
    </div>
  );
}

export default App;
