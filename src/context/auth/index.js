import { createContext, useEffect, useReducer } from "react";

import { auth as firebaseAuth } from "../../lib/firebase/firebase.prod";

export const AuthContext = createContext();

const INITIAL_STATE = {
  userInfo: JSON.parse(localStorage.getItem("USER_INFO") ?? "null"),
  isLoaded: false,
  user: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  console.log(type, payload);
  switch (type) {
    case "USER_SIGNED_IN":
      return {
        ...state,
        isLoaded: true,
        userInfo: payload.userInfo,
        user: payload.user,
      };
    case "AUTH_ERROR":
    case "USER_SIGNED_OUT":
      return {
        ...state,
        isLoaded: true,
        userInfo: null,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(function (user) {
      console.log("onAuthStateChanged", user);
      if (user) {
        const userInfo = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        localStorage.setItem("USER_INFO", JSON.stringify(userInfo));

        dispatch({
          type: "USER_SIGNED_IN",
          payload: { userInfo, user },
        });
      } else {
        localStorage.removeItem("USER_INFO");
        dispatch({ type: "AUTH_ERROR" });
      }
    });

    return unsubscribe;
  }, []);

  const signOut = async () => {
    localStorage.removeItem("USER_INFO");
    try {
      await firebaseAuth.signOut();
      dispatch({ type: "USER_SIGNED_OUT" });
    } catch (error) {
      console.error("signOut ERROR", error);
      dispatch({ type: "AUTH_ERROR" });
    }
  };

  return (
    <AuthContext.Provider value={{ auth, dispatch, signOut }}>{children}</AuthContext.Provider>
  );
};
