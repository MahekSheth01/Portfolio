import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";


const AuthContext =
  createContext();


export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);


  // LOAD USER FROM STORAGE
  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );

    }

  }, []);


  // LOGIN
  const login = (userData) => {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);

  };


  // LOGOUT
  const logout = () => {

    localStorage.removeItem(
      "user"
    );

    setUser(null);

  };


  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};


export const useAuth = () =>
  useContext(AuthContext);