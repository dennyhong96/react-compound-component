import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "normalize.css";

import App from "./App";
import { FirebaseContext } from "./context/firebase";
import { firestore, auth } from "./lib/firebase/firebase.prod";
import { GlobalStyles } from "./globalStyles";

render(
  <FirebaseContext.Provider value={{ firestore, auth }}>
    <BrowserRouter>
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
