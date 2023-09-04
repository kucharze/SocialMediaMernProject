import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Auth from "./pages/Auth/Auth";
import Posts from "./pages/Posts/Posts";
import UserPage from "./pages/UserPage/UserPage";
import { useAuth } from "./contexts/app_context";
import Navbar from "./components/Navbar/Navbar";
import NewsSearch from "./pages/NewsSearch/NewsSearch";

function App() {
  const { user, getUser } = useAuth();

  const setUpUser = async () => {
    await getUser();
    console.log("appjs user", user);
  };

  useEffect(() => {
    setUpUser();
  }, []);

  return (
    <div className="App">
      <h1>K</h1>
      {user ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/User/:id" element={<UserPage />} />
            <Route path="/News" element={<NewsSearch />} />
          </Routes>
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
