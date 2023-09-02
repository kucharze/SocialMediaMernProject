import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const BASE_URL = "http://localhost:3001/users";
const BASE_URL_POSTS = "http://localhost:3001/posts";

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  const postData = async (data) => {
    //console.log("Posting data");
    //console.log(data);
    // AXIOS
    try {
      const res = await axios.post(BASE_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      //console.log("The response", res);
      localStorage.setItem("token", res.data);
      getUser();
    } catch (error) {
      console.log("An error occurred: ", error);
      return "Sign in failed";
    }
  };

  const postLogin = async (data) => {
    //console.log("Post login data", data);

    try {
      const res = await axios.post(`${BASE_URL}/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Returned data", res);
      localStorage.setItem("token", res.data);
      getUser();
    } catch (error) {
      console.log("An error occurred: ", error);
      return "Login failed";
    }
  };

  const searchUser = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/findUser/${id}`);
      //console.log(res);
      return res.data;
    } catch (error) {
      console.log("Error searching for user: ", error);
      return "Error";
    }
  };

  const createPost = async (post) => {
    //console.log("Creating a new post");
    //console.log("post data", post);

    try {
      // user.posts.push
      const res = await axios.post(
        `${BASE_URL_POSTS}/newPost`,
        { id: user._id, post },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("create data response", res);
      setUser(res.data);
    } catch (error) {
      console.log("error creating a post ", error);
    }
  };

  const loadPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL_POSTS}`);
      // console.log(res);
    } catch (error) {
      console.log("Error loading posts list ", error);
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
        logout,
        postData,
        postLogin,
        searchUser,
        createPost,
        loadPosts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AppContext);
};
