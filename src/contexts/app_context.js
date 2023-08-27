import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const BASE_URL = "http://localhost:3001";

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

      console.log(res);
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };
  return (
    <AppContext.Provider value={{ user, posts, postData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AppContext);
};
