import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Auth from "./pages/Auth/Auth";
import Posts from "./pages/Posts/Posts";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      This is our app
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/User/:id" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
