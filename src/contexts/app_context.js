import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const BASE_URL = "http://localhost:3001/users";

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  const postData = async (data) => {
    console.log("Posting data");
    console.log(data);
    // AXIOS
    try {
      const res = await axios.post(BASE_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("The response", res);
      localStorage.setItem("token", res.data);
      getUser();
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };

  const postLogin = async (data) => {
    console.log("Post login data", data);

    try {
    } catch (error) {
      console.log("An error occurred: ", error);
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
    const token = getToken();
    // If there's a token, return the user in the payload, otherwise return null
    const item = token ? JSON.parse(atob(token.split(".")[1])).user : null;

    setUser(item);
  }
  return (
    <AppContext.Provider value={{ user, posts, postData, postLogin }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AppContext);
};
