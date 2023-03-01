import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({
  user: null,
  token: null,
  loggedIn: false,
  onLogin: (_user, _token) => {},
  onLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const onLogin = (newUser, token) => {
    console.log(newUser);
    setToken(token);
    setUser(newUser);
  };

  const onLogout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loggedIn: token ? true : false,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
