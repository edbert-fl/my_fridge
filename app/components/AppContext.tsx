import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { User } from "../utils/Types";

interface AppContextProps {
  currUser: User | null;
  setCurrUser: Dispatch<SetStateAction<User | null>>;
}

export const AppContext = createContext<AppContextProps | undefined>({
  currUser: null,
  setCurrUser: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
};
