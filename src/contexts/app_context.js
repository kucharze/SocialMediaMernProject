import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
};

export const useAuth = () => {
  return useContext(AppContext);
};
