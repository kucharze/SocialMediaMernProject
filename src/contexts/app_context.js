import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(2);
  return <AppContext.Provider value={user}>{children}</AppContext.Provider>;
};
