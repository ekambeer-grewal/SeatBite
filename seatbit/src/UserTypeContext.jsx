import { createContext, useContext, useState } from "react";

const UserTypeContext = createContext();

export function UserTypeProvider({ children }) {
  const [userType, setUserType] = useState(null); // "order" or "deliver"

  return (
    <UserTypeContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserTypeContext.Provider>
  );
}

export function useUserType() {
  return useContext(UserTypeContext);
}