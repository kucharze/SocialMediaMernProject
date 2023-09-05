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
import k from "./K 2.JPG";

function App() {
  const { user, getUser } = useAuth();

  const setUpUser = async () => {
    await getUser();
  };

  useEffect(() => {
    setUpUser();
  }, []);

  return (
    <div className="App">
      <img src={k} alt="" className="logopic" />
      <div className="Display">
        {user ? (
          <>
            <Navbar />
            <div className="main">
              <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/User/:id" element={<UserPage />} />
                <Route path="/News" element={<NewsSearch />} />
              </Routes>
            </div>
          </>
        ) : (
          <Auth />
        )}
      </div>
    </div>
  );
}

export default App;
