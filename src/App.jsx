import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import MyProfile from "./components/MyProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/myprofile" element={<MyProfile />} />
      </Routes>
    </>
  );
}

export default App;
