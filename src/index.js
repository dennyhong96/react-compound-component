import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "normalize.css";

import { AuthProvider } from "./context/auth";
import App from "./App";
import { GlobalStyles } from "./globalStyles";

render(
  <AuthProvider>
    <BrowserRouter>
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
