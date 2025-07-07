import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../url"; 

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/refetch", {
        withCredentials: true,
      });
      setUser(res.data); 
      // console.log("User fetched:", res.data);
    } catch (err) {
      console.log("Failed to fetch user:", err);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
