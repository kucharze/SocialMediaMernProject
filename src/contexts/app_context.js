import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  const postData = (data) => {
    console.log("Posting data");
    console.log(data);
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
