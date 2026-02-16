import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import MyProfile from "./components/MyProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/myprofile" element={<MyProfile/>}></Route>
    </Routes>
  );
}

export default App;
