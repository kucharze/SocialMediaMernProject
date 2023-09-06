import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const BASE_URL = "http://localhost:3001/users";
const BASE_URL_POSTS = "http://localhost:3001/posts";

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [posts, setPosts] = useState(null);

  const postRequest = async (data, url) => {
    const res = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  };

  const postData = async (data) => {
    //console.log(data);
    // AXIOS
    try {
      localStorage.setItem("token", await postRequest(data, BASE_URL));
      getUser();
      return "good";
    } catch (error) {
      console.log("An error occurred: ", error);
      return "Sign in failed";
    }
  };

  const postLogin = async (data) => {
    //console.log("Post login data", data);

    try {
      localStorage.setItem(
        "token",
        await postRequest(data, `${BASE_URL}/login`)
      );
      getUser();
    } catch (error) {
      console.log("A Login error occurred: ", error);
      return "Login failed";
    }
  };

  const searchUser = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/findUser/${id}`);
      //console.log("userdata return", res.data);
      return res.data;
    } catch (error) {
      console.log("Error searching for user: ", error);
      return "Error";
    }
  };

  const createPost = async (post) => {
    //console.log("Creating a new post");

    try {
      setUser(
        await postRequest({ id: user._id, post }, `${BASE_URL_POSTS}/newPost`)
      );
    } catch (error) {
      console.log("error creating a post ", error);
    }
  };

  const updateLikes = async (point, id) => {
    console.log(point);
    try {
      const res = await axios.put(
        `${BASE_URL_POSTS}/updateLikes`,
        { likes: point, postid: id, userid: user._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log("Error updating likes", error);
    }
  };

  //Grab token from local storage
  function getToken() {
    // getItem returns null if there's no string
    const token = localStorage.getItem("token");
    if (!token) return null;
    // Obtain the payload of the token
    const payload = JSON.parse(atob(token.split(".")[1]));
    //console.log(payload);
    // A JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
      // Token has expired - remove it from localStorage
      localStorage.removeItem("token");
      return null;
    }
    return token;
  }

  function getUser() {
    // If there's a token, return the user in the payload, otherwise return null
    const token = getToken();
    const item = token ? JSON.parse(atob(token.split(".")[1])).user : null;
    setUser(item);
    // setPosts(item.posts);
  }

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <AppContext.Provider
      value={{
        getUser,
        user,
        setUser,
        logout,
        postData,
        postLogin,
        searchUser,
        createPost,
        updateLikes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AppContext);
};
