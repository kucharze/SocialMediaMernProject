import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import { useState } from "react";
import Posts from "./pages/Posts/Posts";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      This is our app
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </div>
  );
}

export default App;
