import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import LinkedinProvider from './context/LinkedinProvider'

import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<App />);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LinkedinProvider>

        <App />
      </LinkedinProvider>

    </BrowserRouter>

  </React.StrictMode>
);
