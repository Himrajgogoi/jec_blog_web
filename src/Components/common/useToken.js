import { useState, useEffect } from "react";

const getToken = (initialValue) => {
  const tokenString = JSON.parse(localStorage.getItem("token"));
  if (tokenString) return tokenString;
  if (initialValue instanceof Function) return initialValue();
  console.log("reached getToken()");
  return initialValue;
};

const useToken = (initialValue) => {
  const [token, setToken] = useState(() => {
    return getToken(initialValue);
  });

  useEffect(() => {
    console.log("token changed");
    console.log("TOKEN: ", token);
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  return [token, setToken];
};

export default useToken;
