import React, { createContext, useContext, useState } from "react";
const UserContext = createContext();

export function UserProvider({ children }) {
  const [role, setRole] = useState(null);

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
